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
exports.ReportProxyController = exports.AuditProxyController = exports.TemplateProxyController = exports.NotificationProxyController = exports.StorageProxyController = exports.CommonProxyController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const platform_proxy_service_1 = require("./platform-proxy.service");
class BaseController {
    proxy;
    service;
    constructor(proxy, service) {
        this.proxy = proxy;
        this.service = service;
    }
    async send(response, path, method, authorization, body, query, correlationId) {
        const result = await this.proxy.forward(this.service, path, method, authorization, body, query, correlationId);
        return response.status(result.status).send(result.body);
    }
}
let CommonProxyController = class CommonProxyController extends BaseController {
    constructor(proxy) {
        super(proxy, "common");
    }
    types(r, a) {
        return this.send(r, "master-data/types", "GET", a);
    }
    createType(r, b, a) {
        return this.send(r, "master-data/types", "POST", a, b);
    }
    items(r, t, q, a) {
        return this.send(r, `master-data/${t}`, "GET", a, undefined, q);
    }
    createItem(r, t, b, a) {
        return this.send(r, `master-data/${t}`, "POST", a, b);
    }
    updateItem(r, t, id, b, a) {
        return this.send(r, `master-data/${t}/${id}`, "PATCH", a, b);
    }
    deleteItem(r, t, id, a) {
        return this.send(r, `master-data/${t}/${id}`, "DELETE", a);
    }
    configs(r, a) {
        return this.send(r, "system-configs", "GET", a);
    }
    updateConfig(r, key, b, a) {
        return this.send(r, `system-configs/${key}`, "PATCH", a, b);
    }
    flags(r, a) {
        return this.send(r, "feature-flags", "GET", a);
    }
    updateFlag(r, key, b, a) {
        return this.send(r, `feature-flags/${key}`, "PATCH", a, b);
    }
};
exports.CommonProxyController = CommonProxyController;
__decorate([
    (0, common_1.Get)("master-data/types"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "types", null);
__decorate([
    (0, common_1.Post)("master-data/types"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "createType", null);
__decorate([
    (0, common_1.Get)("master-data/:type"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("type")),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "items", null);
__decorate([
    (0, common_1.Post)("master-data/:type"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("type")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "createItem", null);
__decorate([
    (0, common_1.Patch)("master-data/:type/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("type")),
    __param(2, (0, common_1.Param)("id")),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)("master-data/:type/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("type")),
    __param(2, (0, common_1.Param)("id")),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("system-configs"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "configs", null);
__decorate([
    (0, common_1.Patch)("system-configs/:key"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("key")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "updateConfig", null);
__decorate([
    (0, common_1.Get)("feature-flags"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "flags", null);
__decorate([
    (0, common_1.Patch)("feature-flags/:key"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("key")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", void 0)
], CommonProxyController.prototype, "updateFlag", null);
exports.CommonProxyController = CommonProxyController = __decorate([
    (0, swagger_1.ApiTags)("Common"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "", version: "1" }),
    __metadata("design:paramtypes", [platform_proxy_service_1.PlatformProxyService])
], CommonProxyController);
let StorageProxyController = class StorageProxyController extends BaseController {
    constructor(proxy) {
        super(proxy, "storage");
    }
    async uploadFile(r, file, fields, a, c) {
        const result = await this.proxy.upload("files", a, file, fields, c);
        return r.status(result.status).send(result.body);
    }
    list(r, q, a) {
        return this.send(r, "files", "GET", a, undefined, q);
    }
    get(r, id, a) {
        return this.send(r, `files/${id}`, "GET", a);
    }
    url(r, id, q, a) {
        return this.send(r, `files/${id}/download-url`, "GET", a, undefined, q);
    }
    remove(r, id, a) {
        return this.send(r, `files/${id}`, "DELETE", a);
    }
};
exports.StorageProxyController = StorageProxyController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", { limits: { fileSize: 20 * 1024 * 1024 } })),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                file: { type: "string", format: "binary" },
                category: { type: "string" },
                entityType: { type: "string" },
                entityId: { type: "string" },
            },
        },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __param(4, (0, common_1.Headers)("x-correlation-id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], StorageProxyController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], StorageProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], StorageProxyController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(":id/download-url"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", void 0)
], StorageProxyController.prototype, "url", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], StorageProxyController.prototype, "remove", null);
exports.StorageProxyController = StorageProxyController = __decorate([
    (0, swagger_1.ApiTags)("Files"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "files", version: "1" }),
    __metadata("design:paramtypes", [platform_proxy_service_1.PlatformProxyService])
], StorageProxyController);
let NotificationProxyController = class NotificationProxyController extends BaseController {
    constructor(p) {
        super(p, "notification");
    }
    list(r, a) {
        return this.send(r, "notifications", "GET", a);
    }
    unread(r, a) {
        return this.send(r, "notifications/unread-count", "GET", a);
    }
    read(r, id, a) {
        return this.send(r, `notifications/${id}/read`, "PATCH", a, {});
    }
    all(r, a) {
        return this.send(r, "notifications/read-all", "POST", a, {});
    }
    sendNotice(r, b, a) {
        return this.send(r, "notifications/send", "POST", a, b);
    }
};
exports.NotificationProxyController = NotificationProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NotificationProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("unread-count"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NotificationProxyController.prototype, "unread", null);
__decorate([
    (0, common_1.Patch)(":id/read"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], NotificationProxyController.prototype, "read", null);
__decorate([
    (0, common_1.Post)("read-all"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NotificationProxyController.prototype, "all", null);
__decorate([
    (0, common_1.Post)("send"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], NotificationProxyController.prototype, "sendNotice", null);
exports.NotificationProxyController = NotificationProxyController = __decorate([
    (0, swagger_1.ApiTags)("Notifications"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "notifications", version: "1" }),
    __metadata("design:paramtypes", [platform_proxy_service_1.PlatformProxyService])
], NotificationProxyController);
let TemplateProxyController = class TemplateProxyController extends BaseController {
    constructor(p) {
        super(p, "notification");
    }
    list(r, a) {
        return this.send(r, "notification-templates", "GET", a);
    }
    create(r, b, a) {
        return this.send(r, "notification-templates", "POST", a, b);
    }
    update(r, id, b, a) {
        return this.send(r, `notification-templates/${id}`, "PATCH", a, b);
    }
    remove(r, id, a) {
        return this.send(r, `notification-templates/${id}`, "DELETE", a);
    }
};
exports.TemplateProxyController = TemplateProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TemplateProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], TemplateProxyController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String]),
    __metadata("design:returntype", void 0)
], TemplateProxyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], TemplateProxyController.prototype, "remove", null);
exports.TemplateProxyController = TemplateProxyController = __decorate([
    (0, swagger_1.ApiTags)("Notification Templates"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "notification-templates", version: "1" }),
    __metadata("design:paramtypes", [platform_proxy_service_1.PlatformProxyService])
], TemplateProxyController);
let AuditProxyController = class AuditProxyController extends BaseController {
    constructor(p) {
        super(p, "audit");
    }
    list(r, q, a) {
        return this.send(r, "audit-logs", "GET", a, undefined, q);
    }
    get(r, id, a) {
        return this.send(r, `audit-logs/${id}`, "GET", a);
    }
};
exports.AuditProxyController = AuditProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], AuditProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AuditProxyController.prototype, "get", null);
exports.AuditProxyController = AuditProxyController = __decorate([
    (0, swagger_1.ApiTags)("Audit"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "audit-logs", version: "1" }),
    __metadata("design:paramtypes", [platform_proxy_service_1.PlatformProxyService])
], AuditProxyController);
let ReportProxyController = class ReportProxyController extends BaseController {
    constructor(p) {
        super(p, "report");
    }
    dashboard(r, a) {
        return this.send(r, "reports/dashboard", "GET", a);
    }
    sales(r, q, a) {
        return this.send(r, "reports/sales", "GET", a, undefined, q);
    }
    orders(r, q, a) {
        return this.send(r, "reports/orders", "GET", a, undefined, q);
    }
    payments(r, q, a) {
        return this.send(r, "reports/payments", "GET", a, undefined, q);
    }
    create(r, b, a) {
        return this.send(r, "reports/exports", "POST", a, b);
    }
    exports(r, a) {
        return this.send(r, "reports/exports", "GET", a);
    }
    export(r, id, a) {
        return this.send(r, `reports/exports/${id}`, "GET", a);
    }
    rebuild(r, a) {
        return this.send(r, "reports/rebuild", "POST", a, {});
    }
};
exports.ReportProxyController = ReportProxyController;
__decorate([
    (0, common_1.Get)("dashboard"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "dashboard", null);
__decorate([
    (0, common_1.Get)("sales"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "sales", null);
__decorate([
    (0, common_1.Get)("orders"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "orders", null);
__decorate([
    (0, common_1.Get)("payments"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "payments", null);
__decorate([
    (0, common_1.Post)("exports"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("exports"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "exports", null);
__decorate([
    (0, common_1.Get)("exports/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "export", null);
__decorate([
    (0, common_1.Post)("rebuild"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReportProxyController.prototype, "rebuild", null);
exports.ReportProxyController = ReportProxyController = __decorate([
    (0, swagger_1.ApiTags)("Reports"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: "reports", version: "1" }),
    __metadata("design:paramtypes", [platform_proxy_service_1.PlatformProxyService])
], ReportProxyController);
//# sourceMappingURL=platform-proxy.controller.js.map