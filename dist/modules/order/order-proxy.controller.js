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
exports.RefundsProxyController = exports.InvoicesProxyController = exports.PaymentsProxyController = exports.OrdersProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_proxy_dto_1 = require("./dto/order-proxy.dto");
const order_proxy_service_1 = require("./order-proxy.service");
class ProxyController {
    proxy;
    constructor(proxy) {
        this.proxy = proxy;
    }
    async send(response, path, method, authorization, idempotencyKey, body, query) {
        const result = await this.proxy.forward(path, method, authorization, idempotencyKey, body, query);
        response.status(result.status);
        if (result.body === undefined) {
            response.send();
            return;
        }
        response.json(result.body);
    }
}
let OrdersProxyController = class OrdersProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    create(authorization, idempotencyKey, body, response) {
        return this.send(response, "orders", "POST", authorization, idempotencyKey, body);
    }
    list(authorization, query, response) {
        return this.send(response, "orders", "GET", authorization, undefined, undefined, {
            ...query,
        });
    }
    get(id, authorization, response) {
        return this.send(response, `orders/${id}`, "GET", authorization);
    }
    update(id, authorization, idempotencyKey, body, response) {
        return this.send(response, `orders/${id}`, "PATCH", authorization, idempotencyKey, body);
    }
    submit(id, headers, body, response) {
        return this.action(response, id, "submit", headers, body);
    }
    cancel(id, headers, body, response) {
        return this.action(response, id, "cancel", headers, body);
    }
    process(id, headers, body, response) {
        return this.action(response, id, "process", headers, body);
    }
    complete(id, headers, body, response) {
        return this.action(response, id, "complete", headers, body);
    }
    history(id, authorization, response) {
        return this.send(response, `orders/${id}/history`, "GET", authorization);
    }
    createPayment(id, headers, response) {
        return this.send(response, `orders/${id}/payments`, "POST", headers.authorization, headers["idempotency-key"], {});
    }
    payments(id, authorization, response) {
        return this.send(response, `orders/${id}/payments`, "GET", authorization);
    }
    invoice(id, authorization, response) {
        return this.send(response, `orders/${id}/invoice`, "GET", authorization);
    }
    action(response, id, action, headers, body) {
        return this.send(response, `orders/${id}/${action}`, "POST", headers.authorization, headers["idempotency-key"], body);
    }
};
exports.OrdersProxyController = OrdersProxyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Headers)("idempotency-key")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, order_proxy_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_proxy_dto_1.OrderQueryDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Headers)("idempotency-key")),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, order_proxy_dto_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(":id/submit"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, order_proxy_dto_1.VersionDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(":id/cancel"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, order_proxy_dto_1.VersionDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(":id/process"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, order_proxy_dto_1.VersionDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "process", null);
__decorate([
    (0, common_1.Post)(":id/complete"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, order_proxy_dto_1.VersionDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "complete", null);
__decorate([
    (0, common_1.Get)(":id/history"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "history", null);
__decorate([
    (0, common_1.Post)(":id/payments"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)(":id/payments"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "payments", null);
__decorate([
    (0, common_1.Get)(":id/invoice"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], OrdersProxyController.prototype, "invoice", null);
exports.OrdersProxyController = OrdersProxyController = __decorate([
    (0, swagger_1.ApiTags)("orders"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("orders"),
    __metadata("design:paramtypes", [order_proxy_service_1.OrderProxyService])
], OrdersProxyController);
let PaymentsProxyController = class PaymentsProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    get(id, authorization, response) {
        return this.send(response, `payments/${id}`, "GET", authorization);
    }
    checkout(id, authorization, response) {
        return this.send(response, `payments/${id}/checkout`, "GET", authorization);
    }
    retryCheckout(id, headers, response) {
        return this.send(response, `payments/${id}/retry-checkout`, "POST", headers.authorization, headers["idempotency-key"], {});
    }
    capture(id, headers, response) {
        return this.send(response, `payments/${id}/capture`, "POST", headers.authorization, headers["idempotency-key"], {});
    }
    void(id, headers, response) {
        return this.send(response, `payments/${id}/void`, "POST", headers.authorization, headers["idempotency-key"], {});
    }
    refund(id, headers, body, response) {
        return this.send(response, `payments/${id}/refunds`, "POST", headers.authorization, headers["idempotency-key"], body);
    }
    refunds(id, authorization, response) {
        return this.send(response, `payments/${id}/refunds`, "GET", authorization);
    }
};
exports.PaymentsProxyController = PaymentsProxyController;
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsProxyController.prototype, "get", null);
__decorate([
    (0, common_1.Get)(":id/checkout"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsProxyController.prototype, "checkout", null);
__decorate([
    (0, common_1.Post)(":id/retry-checkout"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsProxyController.prototype, "retryCheckout", null);
__decorate([
    (0, common_1.Post)(":id/capture"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsProxyController.prototype, "capture", null);
__decorate([
    (0, common_1.Post)(":id/void"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsProxyController.prototype, "void", null);
__decorate([
    (0, common_1.Post)(":id/refunds"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, order_proxy_dto_1.RefundDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsProxyController.prototype, "refund", null);
__decorate([
    (0, common_1.Get)(":id/refunds"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsProxyController.prototype, "refunds", null);
exports.PaymentsProxyController = PaymentsProxyController = __decorate([
    (0, swagger_1.ApiTags)("payments"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("payments"),
    __metadata("design:paramtypes", [order_proxy_service_1.OrderProxyService])
], PaymentsProxyController);
let InvoicesProxyController = class InvoicesProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    list(authorization, query, response) {
        return this.send(response, "invoices", "GET", authorization, undefined, undefined, { ...query });
    }
    get(id, authorization, response) {
        return this.send(response, `invoices/${id}`, "GET", authorization);
    }
};
exports.InvoicesProxyController = InvoicesProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_proxy_dto_1.PageQueryDto, Object]),
    __metadata("design:returntype", void 0)
], InvoicesProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], InvoicesProxyController.prototype, "get", null);
exports.InvoicesProxyController = InvoicesProxyController = __decorate([
    (0, swagger_1.ApiTags)("invoices"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("invoices"),
    __metadata("design:paramtypes", [order_proxy_service_1.OrderProxyService])
], InvoicesProxyController);
let RefundsProxyController = class RefundsProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    list(authorization, query, response) {
        return this.send(response, "refunds", "GET", authorization, undefined, undefined, { ...query });
    }
    get(id, authorization, response) {
        return this.send(response, `refunds/${id}`, "GET", authorization);
    }
};
exports.RefundsProxyController = RefundsProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_proxy_dto_1.PageQueryDto, Object]),
    __metadata("design:returntype", void 0)
], RefundsProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], RefundsProxyController.prototype, "get", null);
exports.RefundsProxyController = RefundsProxyController = __decorate([
    (0, swagger_1.ApiTags)("refunds"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("refunds"),
    __metadata("design:paramtypes", [order_proxy_service_1.OrderProxyService])
], RefundsProxyController);
//# sourceMappingURL=order-proxy.controller.js.map