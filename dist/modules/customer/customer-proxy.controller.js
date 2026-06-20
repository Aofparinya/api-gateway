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
exports.CustomerProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_proxy_service_1 = require("./customer-proxy.service");
const customer_proxy_dto_1 = require("./dto/customer-proxy.dto");
let CustomerProxyController = class CustomerProxyController {
    proxy;
    constructor(proxy) {
        this.proxy = proxy;
    }
    createCustomer(authorization, body, response) {
        return this.send(response, "customers", "POST", authorization, body);
    }
    listCustomers(authorization, query, response) {
        return this.send(response, "customers", "GET", authorization, undefined, {
            ...query,
        });
    }
    getCustomer(id, authorization, response) {
        return this.send(response, `customers/${id}`, "GET", authorization);
    }
    updateCustomer(id, authorization, body, response) {
        return this.send(response, `customers/${id}`, "PATCH", authorization, body);
    }
    deleteCustomer(id, authorization, response) {
        return this.send(response, `customers/${id}`, "DELETE", authorization);
    }
    createAddress(id, authorization, body, response) {
        return this.send(response, `customers/${id}/addresses`, "POST", authorization, body);
    }
    listAddresses(id, authorization, response) {
        return this.send(response, `customers/${id}/addresses`, "GET", authorization);
    }
    updateAddress(id, addressId, authorization, body, response) {
        return this.send(response, `customers/${id}/addresses/${addressId}`, "PATCH", authorization, body);
    }
    deleteAddress(id, addressId, authorization, response) {
        return this.send(response, `customers/${id}/addresses/${addressId}`, "DELETE", authorization);
    }
    createContact(id, authorization, body, response) {
        return this.send(response, `customers/${id}/contacts`, "POST", authorization, body);
    }
    listContacts(id, authorization, response) {
        return this.send(response, `customers/${id}/contacts`, "GET", authorization);
    }
    updateContact(id, contactId, authorization, body, response) {
        return this.send(response, `customers/${id}/contacts/${contactId}`, "PATCH", authorization, body);
    }
    deleteContact(id, contactId, authorization, response) {
        return this.send(response, `customers/${id}/contacts/${contactId}`, "DELETE", authorization);
    }
    createTaxProfile(id, authorization, body, response) {
        return this.send(response, `customers/${id}/tax-profiles`, "POST", authorization, body);
    }
    listTaxProfiles(id, authorization, response) {
        return this.send(response, `customers/${id}/tax-profiles`, "GET", authorization);
    }
    updateTaxProfile(id, taxProfileId, authorization, body, response) {
        return this.send(response, `customers/${id}/tax-profiles/${taxProfileId}`, "PATCH", authorization, body);
    }
    deleteTaxProfile(id, taxProfileId, authorization, response) {
        return this.send(response, `customers/${id}/tax-profiles/${taxProfileId}`, "DELETE", authorization);
    }
    async send(response, path, method, authorization, body, query) {
        const result = await this.proxy.forward(path, method, authorization, body, query);
        response.status(result.status);
        if (result.body === undefined) {
            response.send();
            return;
        }
        response.json(result.body);
    }
};
exports.CustomerProxyController = CustomerProxyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, customer_proxy_dto_1.CreateCustomerDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, customer_proxy_dto_1.CustomerQueryDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "listCustomers", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, customer_proxy_dto_1.UpdateCustomerDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Post)(":id/addresses"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, customer_proxy_dto_1.CreateAddressDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "createAddress", null);
__decorate([
    (0, common_1.Get)(":id/addresses"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "listAddresses", null);
__decorate([
    (0, common_1.Patch)(":id/addresses/:addressId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("addressId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, customer_proxy_dto_1.UpdateAddressDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)(":id/addresses/:addressId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("addressId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.Post)(":id/contacts"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, customer_proxy_dto_1.CreateContactDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)(":id/contacts"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "listContacts", null);
__decorate([
    (0, common_1.Patch)(":id/contacts/:contactId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("contactId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, customer_proxy_dto_1.UpdateContactDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "updateContact", null);
__decorate([
    (0, common_1.Delete)(":id/contacts/:contactId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("contactId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "deleteContact", null);
__decorate([
    (0, common_1.Post)(":id/tax-profiles"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, customer_proxy_dto_1.CreateTaxProfileDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "createTaxProfile", null);
__decorate([
    (0, common_1.Get)(":id/tax-profiles"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "listTaxProfiles", null);
__decorate([
    (0, common_1.Patch)(":id/tax-profiles/:taxProfileId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("taxProfileId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, customer_proxy_dto_1.UpdateTaxProfileDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "updateTaxProfile", null);
__decorate([
    (0, common_1.Delete)(":id/tax-profiles/:taxProfileId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("taxProfileId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], CustomerProxyController.prototype, "deleteTaxProfile", null);
exports.CustomerProxyController = CustomerProxyController = __decorate([
    (0, swagger_1.ApiTags)("customers"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("customers"),
    __metadata("design:paramtypes", [customer_proxy_service_1.CustomerProxyService])
], CustomerProxyController);
//# sourceMappingURL=customer-proxy.controller.js.map