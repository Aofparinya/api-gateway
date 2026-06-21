import { BadGatewayException, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class AuthProxyService {
  private readonly baseUrl: string;

  constructor(
    config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.baseUrl = config
      .get<string>("AUTH_SERVICE_URL", "http://localhost:3001")
      .replace(/\/$/, "");
  }

  async forward(
    path: string,
    method: string,
    body?: unknown,
    authorization?: string,
  ): Promise<{ status: number; body: unknown }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/${path}`, {
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
      throw new BadGatewayException("Auth service is unavailable");
    }
  }

  private correlationHeaders(): Record<string, string> {
    const correlationId = this.request.header("x-correlation-id");
    return correlationId ? { "x-correlation-id": correlationId } : {};
  }
}
