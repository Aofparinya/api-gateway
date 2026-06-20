"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerProxyModule = void 0;
const common_1 = require("@nestjs/common");
const customer_proxy_controller_1 = require("./customer-proxy.controller");
const customer_proxy_service_1 = require("./customer-proxy.service");
let CustomerProxyModule = class CustomerProxyModule {
};
exports.CustomerProxyModule = CustomerProxyModule;
exports.CustomerProxyModule = CustomerProxyModule = __decorate([
    (0, common_1.Module)({
        controllers: [customer_proxy_controller_1.CustomerProxyController],
        providers: [customer_proxy_service_1.CustomerProxyService],
    })
], CustomerProxyModule);
//# sourceMappingURL=customer-proxy.module.js.map