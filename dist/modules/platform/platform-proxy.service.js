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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformProxyService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
let PlatformProxyService = class PlatformProxyService {
    request;
    urls;
    constructor(config, request) {
        this.request = request;
        this.urls = {
            common: config.get("COMMON_SERVICE_URL", "http://localhost:3006"),
            storage: config.get("STORAGE_SERVICE_URL", "http://localhost:3007"),
            notification: config.get("NOTIFICATION_SERVICE_URL", "http://localhost:3008"),
            audit: config.get("AUDIT_SERVICE_URL", "http://localhost:3009"),
            report: config.get("REPORT_SERVICE_URL", "http://localhost:3010"),
        };
    }
    async forward(service, path, method, authorization, body, query, correlationId) {
        try {
            const url = new URL(`${this.urls[service].replace(/\/$/, "")}/api/v1/${path}`);
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
                body: text ? JSON.parse(text) : undefined,
            };
        }
        catch {
            throw new common_1.BadGatewayException(`${service} service is unavailable`);
        }
    }
    async upload(path, authorization, file, fields, correlationId) {
        try {
            const form = new FormData();
            form.append("file", new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }), file.originalname);
            for (const [key, value] of Object.entries(fields))
                if (value)
                    form.append(key, value);
            const response = await fetch(`${this.urls.storage.replace(/\/$/, "")}/api/v1/${path}`, {
                method: "POST",
                headers: {
                    ...(authorization ? { authorization } : {}),
                    ...this.correlationHeaders(correlationId),
                },
                body: form,
                signal: AbortSignal.timeout(30000),
            });
            const text = await response.text();
            return {
                status: response.status,
                body: text ? JSON.parse(text) : undefined,
            };
        }
        catch {
            throw new common_1.BadGatewayException("storage service is unavailable");
        }
    }
    correlationHeaders(value) {
        const correlationId = value ?? this.request.header("x-correlation-id");
        return correlationId ? { "x-correlation-id": correlationId } : {};
    }
};
exports.PlatformProxyService = PlatformProxyService;
exports.PlatformProxyService = PlatformProxyService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], PlatformProxyService);
//# sourceMappingURL=platform-proxy.service.js.map