import { Injectable, type NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

@Injectable()
export class AuditActivityMiddleware implements NestMiddleware {
  private readonly auditUrl: string;
  private readonly internalKey: string;
  constructor(config: ConfigService) {
    this.auditUrl = config
      .get<string>("AUDIT_SERVICE_URL", "http://localhost:3009")
      .replace(/\/$/, "");
    this.internalKey = config.get<string>(
      "AUDIT_INTERNAL_KEY",
      "development-audit-internal-key",
    );
  }
  use(request: Request, response: Response, next: NextFunction) {
    const started = performance.now();
    const correlationId = request.header("x-correlation-id") ?? randomUUID();
    request.headers["x-correlation-id"] = correlationId;
    response.setHeader("x-correlation-id", correlationId);
    response.on("finish", () => {
      const actorId = this.actor(request.header("authorization"));
      const payload = {
        eventId: randomUUID(),
        eventName: "api.activity",
        version: "1.0",
        occurredAt: new Date().toISOString(),
        source: "api-gateway",
        correlationId,
        actorId,
        data: {
          method: request.method,
          path: request.originalUrl,
          statusCode: response.statusCode,
          durationMs: Math.round(performance.now() - started),
          ipAddress: request.ip,
          userAgent: request.header("user-agent") ?? "",
        },
      };
      void fetch(`${this.auditUrl}/api/v1/internal/api-activities`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-internal-key": this.internalKey,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(2000),
      }).catch(() => undefined);
    });
    next();
  }
  private actor(header?: string) {
    if (!header?.startsWith("Bearer ")) return "";
    try {
      const payload = JSON.parse(
        Buffer.from(header.split(".")[1], "base64url").toString("utf8"),
      ) as { sub?: string };
      return payload.sub ?? "";
    } catch {
      return "";
    }
  }
}
