import { BadGatewayException, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";

type QueryValue = string | number | boolean | undefined;

@Injectable({ scope: Scope.REQUEST })
export class CustomerProxyService {
  private readonly baseUrl: string;

  constructor(
    config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.baseUrl = config
      .get<string>("CUSTOMER_SERVICE_URL", "http://localhost:3002")
      .replace(/\/$/, "");
  }

  async forward(
    path: string,
    method: string,
    authorization: string | undefined,
    body?: unknown,
    query?: Record<string, QueryValue>,
  ): Promise<{ status: number; body: unknown }> {
    try {
      const url = new URL(`${this.baseUrl}/api/v1/${path}`);
      for (const [key, value] of Object.entries(query ?? {})) {
        if (value !== undefined && value !== "") {
          url.searchParams.set(key, String(value));
        }
      }
      const response = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
          ...(authorization ? { authorization } : {}),
          ...this.correlationHeaders(),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(5000),
      });
      const text = await response.text();
      return {
        status: response.status,
        body: text ? (JSON.parse(text) as unknown) : undefined,
      };
    } catch {
      throw new BadGatewayException("Customer service is unavailable");
    }
  }

  private correlationHeaders(): Record<string, string> {
    const correlationId = this.request.header("x-correlation-id");
    return correlationId ? { "x-correlation-id": correlationId } : {};
  }
}
