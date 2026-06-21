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
exports.AuthProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_proxy_service_1 = require("./auth-proxy.service");
const auth_proxy_dto_1 = require("./dto/auth-proxy.dto");
let AuthProxyController = class AuthProxyController {
    proxy;
    constructor(proxy) {
        this.proxy = proxy;
    }
    login(body, response) {
        return this.send(response, "auth/login", "POST", body);
    }
    register(body, response) {
        return this.send(response, "auth/register", "POST", body);
    }
    refresh(body, response) {
        return this.send(response, "auth/refresh-token", "POST", body);
    }
    logout(body, response) {
        return this.send(response, "auth/logout", "POST", body);
    }
    validate(body, response) {
        return this.send(response, "auth/validate-token", "POST", body);
    }
    serviceToken(body, response) {
        return this.send(response, "auth/service-token", "POST", body);
    }
    me(authorization, response) {
        return this.send(response, "auth/me", "GET", undefined, authorization);
    }
    async send(response, path, method, body, authorization) {
        const result = await this.proxy.forward(path, method, body, authorization);
        response.status(result.status);
        if (result.body === undefined) {
            response.send();
            return;
        }
        response.json(result.body);
    }
};
exports.AuthProxyController = AuthProxyController;
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_proxy_dto_1.LoginDto, Object]),
    __metadata("design:returntype", void 0)
], AuthProxyController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_proxy_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", void 0)
], AuthProxyController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("refresh-token"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_proxy_dto_1.RefreshTokenDto, Object]),
    __metadata("design:returntype", void 0)
], AuthProxyController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_proxy_dto_1.LogoutDto, Object]),
    __metadata("design:returntype", void 0)
], AuthProxyController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("validate-token"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_proxy_dto_1.ValidateTokenDto, Object]),
    __metadata("design:returntype", void 0)
], AuthProxyController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)("service-token"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_proxy_dto_1.ServiceTokenDto, Object]),
    __metadata("design:returntype", void 0)
], AuthProxyController.prototype, "serviceToken", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthProxyController.prototype, "me", null);
exports.AuthProxyController = AuthProxyController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_proxy_service_1.AuthProxyService])
], AuthProxyController);
//# sourceMappingURL=auth-proxy.controller.js.map