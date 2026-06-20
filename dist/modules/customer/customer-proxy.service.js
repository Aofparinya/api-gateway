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
exports.CustomerProxyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let CustomerProxyService = class CustomerProxyService {
    baseUrl;
    constructor(config) {
        this.baseUrl = config
            .get("CUSTOMER_SERVICE_URL", "http://localhost:3002")
            .replace(/\/$/, "");
    }
    async forward(path, method, authorization, body, query) {
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
            throw new common_1.BadGatewayException("Customer service is unavailable");
        }
    }
};
exports.CustomerProxyService = CustomerProxyService;
exports.CustomerProxyService = CustomerProxyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CustomerProxyService);
//# sourceMappingURL=customer-proxy.service.js.map