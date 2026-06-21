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
exports.AuthProxyService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
let AuthProxyService = class AuthProxyService {
    request;
    baseUrl;
    constructor(config, request) {
        this.request = request;
        this.baseUrl = config
            .get("AUTH_SERVICE_URL", "http://localhost:3001")
            .replace(/\/$/, "");
    }
    async forward(path, method, body, authorization) {
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
                body: text ? JSON.parse(text) : undefined,
            };
        }
        catch {
            throw new common_1.BadGatewayException("Auth service is unavailable");
        }
    }
    correlationHeaders() {
        const correlationId = this.request.header("x-correlation-id");
        return correlationId ? { "x-correlation-id": correlationId } : {};
    }
};
exports.AuthProxyService = AuthProxyService;
exports.AuthProxyService = AuthProxyService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], AuthProxyService);
//# sourceMappingURL=auth-proxy.service.js.map