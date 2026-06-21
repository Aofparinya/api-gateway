"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditActivityMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_crypto_1 = require("node:crypto");
let AuditActivityMiddleware = class AuditActivityMiddleware {
    auditUrl;
    internalKey;
    constructor(config) {
        this.auditUrl = config
            .get("AUDIT_SERVICE_URL", "http://localhost:3009")
            .replace(/\/$/, "");
        this.internalKey = config.get("AUDIT_INTERNAL_KEY", "development-audit-internal-key");
    }
    use(request, response, next) {
        const started = performance.now();
        const correlationId = request.header("x-correlation-id") ?? (0, node_crypto_1.randomUUID)();
        request.headers["x-correlation-id"] = correlationId;
        response.setHeader("x-correlation-id", correlationId);
        response.on("finish", () => {
            const actorId = this.actor(request.header("authorization"));
            const payload = {
                eventId: (0, node_crypto_1.randomUUID)(),
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
    actor(header) {
        if (!header?.startsWith("Bearer "))
            return "";
        try {
            const payload = JSON.parse(Buffer.from(header.split(".")[1], "base64url").toString("utf8"));
            return payload.sub ?? "";
        }
        catch {
            return "";
        }
    }
};
exports.AuditActivityMiddleware = AuditActivityMiddleware;
exports.AuditActivityMiddleware = AuditActivityMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuditActivityMiddleware);
//# sourceMappingURL=audit-activity.middleware.js.map