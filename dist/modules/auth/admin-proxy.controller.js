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
exports.PermissionsProxyController = exports.RolesProxyController = exports.UsersProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_proxy_service_1 = require("./auth-proxy.service");
const auth_proxy_dto_1 = require("./dto/auth-proxy.dto");
class AdminProxyController {
    proxy;
    constructor(proxy) {
        this.proxy = proxy;
    }
    async send(response, path, method, authorization, body) {
        const result = await this.proxy.forward(path, method, body, authorization);
        response.status(result.status);
        if (result.body === undefined) {
            response.send();
            return;
        }
        response.json(result.body);
    }
}
let UsersProxyController = class UsersProxyController extends AdminProxyController {
    constructor(proxy) {
        super(proxy);
    }
    create(authorization, body, response) {
        return this.send(response, "users", "POST", authorization, body);
    }
    list(authorization, response) {
        return this.send(response, "users", "GET", authorization);
    }
    get(id, authorization, response) {
        return this.send(response, `users/${id}`, "GET", authorization);
    }
    update(id, authorization, body, response) {
        return this.send(response, `users/${id}`, "PATCH", authorization, body);
    }
    assignRoles(id, authorization, body, response) {
        return this.send(response, `users/${id}/roles`, "PATCH", authorization, body);
    }
};
exports.UsersProxyController = UsersProxyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_proxy_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersProxyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersProxyController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, auth_proxy_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersProxyController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id/roles"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, auth_proxy_dto_1.AssignRolesDto, Object]),
    __metadata("design:returntype", void 0)
], UsersProxyController.prototype, "assignRoles", null);
exports.UsersProxyController = UsersProxyController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [auth_proxy_service_1.AuthProxyService])
], UsersProxyController);
let RolesProxyController = class RolesProxyController extends AdminProxyController {
    constructor(proxy) {
        super(proxy);
    }
    list(authorization, response) {
        return this.send(response, "roles", "GET", authorization);
    }
};
exports.RolesProxyController = RolesProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RolesProxyController.prototype, "list", null);
exports.RolesProxyController = RolesProxyController = __decorate([
    (0, swagger_1.ApiTags)("roles"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("roles"),
    __metadata("design:paramtypes", [auth_proxy_service_1.AuthProxyService])
], RolesProxyController);
let PermissionsProxyController = class PermissionsProxyController extends AdminProxyController {
    constructor(proxy) {
        super(proxy);
    }
    list(authorization, response) {
        return this.send(response, "permissions", "GET", authorization);
    }
};
exports.PermissionsProxyController = PermissionsProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PermissionsProxyController.prototype, "list", null);
exports.PermissionsProxyController = PermissionsProxyController = __decorate([
    (0, swagger_1.ApiTags)("permissions"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("permissions"),
    __metadata("design:paramtypes", [auth_proxy_service_1.AuthProxyService])
], PermissionsProxyController);
//# sourceMappingURL=admin-proxy.controller.js.map