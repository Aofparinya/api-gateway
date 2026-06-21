import { BadGatewayException, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";

export type ServiceName =
  | "common"
  | "storage"
  | "notification"
  | "audit"
  | "report";
type Query = Record<string, string | number | boolean | undefined>;

@Injectable({ scope: Scope.REQUEST })
export class PlatformProxyService {
  private readonly urls: Record<ServiceName, string>;

  constructor(
    config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.urls = {
      common: config.get<string>("COMMON_SERVICE_URL", "http://localhost:3006"),
      storage: config.get<string>(
        "STORAGE_SERVICE_URL",
        "http://localhost:3007",
      ),
      notification: config.get<string>(
        "NOTIFICATION_SERVICE_URL",
        "http://localhost:3008",
      ),
      audit: config.get<string>("AUDIT_SERVICE_URL", "http://localhost:3009"),
      report: config.get<string>("REPORT_SERVICE_URL", "http://localhost:3010"),
    };
  }

  async forward(
    service: ServiceName,
    path: string,
    method: string,
    authorization?: string,
    body?: unknown,
    query?: Query,
    correlationId?: string,
  ) {
    try {
      const url = new URL(
        `${this.urls[service].replace(/\/$/, "")}/api/v1/${path}`,
      );
      for (const [key, value] of Object.entries(query ?? {}))
        if (value !== undefined && value !== "")
          url.searchParams.set(key, String(value));
      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
          ...(authorization ? { authorization } : {}),
          ...this.correlationHeaders(correlationId),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
      });
      const text = await response.text();
      return {
        status: response.status,
        body: text ? (JSON.parse(text) as unknown) : undefined,
      };
    } catch {
      throw new BadGatewayException(`${service} service is unavailable`);
    }
  }

  async upload(
    path: string,
    authorization: string | undefined,
    file: { buffer: Buffer; originalname: string; mimetype: string },
    fields: Record<string, string>,
    correlationId?: string,
  ) {
    try {
      const form = new FormData();
      form.append(
        "file",
        new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
        file.originalname,
      );
      for (const [key, value] of Object.entries(fields))
        if (value) form.append(key, value);
      const response = await fetch(
        `${this.urls.storage.replace(/\/$/, "")}/api/v1/${path}`,
        {
          method: "POST",
          headers: {
            ...(authorization ? { authorization } : {}),
            ...this.correlationHeaders(correlationId),
          },
          body: form,
          signal: AbortSignal.timeout(30000),
        },
      );
      const text = await response.text();
      return {
        status: response.status,
        body: text ? (JSON.parse(text) as unknown) : undefined,
      };
    } catch {
      throw new BadGatewayException("storage service is unavailable");
    }
  }

  private correlationHeaders(value?: string): Record<string, string> {
    const correlationId = value ?? this.request.header("x-correlation-id");
    return correlationId ? { "x-correlation-id": correlationId } : {};
  }
}
