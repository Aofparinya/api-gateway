"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogProxyModule = void 0;
const common_1 = require("@nestjs/common");
const catalog_proxy_controller_1 = require("./catalog-proxy.controller");
const catalog_proxy_service_1 = require("./catalog-proxy.service");
let CatalogProxyModule = class CatalogProxyModule {
};
exports.CatalogProxyModule = CatalogProxyModule;
exports.CatalogProxyModule = CatalogProxyModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            catalog_proxy_controller_1.CategoriesProxyController,
            catalog_proxy_controller_1.ProductsProxyController,
            catalog_proxy_controller_1.WarehousesProxyController,
            catalog_proxy_controller_1.InventoryProxyController,
        ],
        providers: [catalog_proxy_service_1.CatalogProxyService],
    })
], CatalogProxyModule);
//# sourceMappingURL=catalog-proxy.module.js.map