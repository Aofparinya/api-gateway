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
exports.InventoryProxyController = exports.WarehousesProxyController = exports.ProductsProxyController = exports.CategoriesProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const catalog_proxy_service_1 = require("./catalog-proxy.service");
const catalog_proxy_dto_1 = require("./dto/catalog-proxy.dto");
class ProxyController {
    proxy;
    constructor(proxy) {
        this.proxy = proxy;
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
}
let CategoriesProxyController = class CategoriesProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    create(authorization, body, response) {
        return this.send(response, "categories", "POST", authorization, body);
    }
    list(authorization, response) {
        return this.send(response, "categories", "GET", authorization);
    }
    get(id, authorization, response) {
        return this.send(response, `categories/${id}`, "GET", authorization);
    }
    update(id, authorization, body, response) {
        return this.send(response, `categories/${id}`, "PATCH", authorization, body);
    }
    delete(id, authorization, response) {
        return this.send(response, `categories/${id}`, "DELETE", authorization);
    }
};
exports.CategoriesProxyController = CategoriesProxyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoriesProxyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CategoriesProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CategoriesProxyController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], CategoriesProxyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], CategoriesProxyController.prototype, "delete", null);
exports.CategoriesProxyController = CategoriesProxyController = __decorate([
    (0, swagger_1.ApiTags)("catalog-categories"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("categories"),
    __metadata("design:paramtypes", [catalog_proxy_service_1.CatalogProxyService])
], CategoriesProxyController);
let ProductsProxyController = class ProductsProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    createProduct(authorization, body, response) {
        return this.send(response, "products", "POST", authorization, body);
    }
    listProducts(authorization, query, response) {
        return this.send(response, "products", "GET", authorization, undefined, {
            ...query,
        });
    }
    getProduct(id, authorization, response) {
        return this.send(response, `products/${id}`, "GET", authorization);
    }
    updateProduct(id, authorization, body, response) {
        return this.send(response, `products/${id}`, "PATCH", authorization, body);
    }
    deleteProduct(id, authorization, response) {
        return this.send(response, `products/${id}`, "DELETE", authorization);
    }
    assignCategory(id, authorization, body, response) {
        return this.send(response, `products/${id}/categories`, "POST", authorization, body);
    }
    removeCategory(id, categoryId, authorization, response) {
        return this.send(response, `products/${id}/categories/${categoryId}`, "DELETE", authorization);
    }
    createImage(id, authorization, body, response) {
        return this.send(response, `products/${id}/images`, "POST", authorization, body);
    }
    updateImage(id, imageId, authorization, body, response) {
        return this.send(response, `products/${id}/images/${imageId}`, "PATCH", authorization, body);
    }
    deleteImage(id, imageId, authorization, response) {
        return this.send(response, `products/${id}/images/${imageId}`, "DELETE", authorization);
    }
    createSku(id, authorization, body, response) {
        return this.send(response, `products/${id}/skus`, "POST", authorization, body);
    }
    listSkus(id, authorization, response) {
        return this.send(response, `products/${id}/skus`, "GET", authorization);
    }
    getSku(id, authorization, response) {
        return this.send(response, `skus/${id}`, "GET", authorization);
    }
    updateSku(id, authorization, body, response) {
        return this.send(response, `skus/${id}`, "PATCH", authorization, body);
    }
    deleteSku(id, authorization, response) {
        return this.send(response, `skus/${id}`, "DELETE", authorization);
    }
    createPrice(id, authorization, body, response) {
        return this.send(response, `skus/${id}/prices`, "POST", authorization, body);
    }
    listPrices(id, authorization, response) {
        return this.send(response, `skus/${id}/prices`, "GET", authorization);
    }
    updatePrice(id, priceId, authorization, body, response) {
        return this.send(response, `skus/${id}/prices/${priceId}`, "PATCH", authorization, body);
    }
    deletePrice(id, priceId, authorization, response) {
        return this.send(response, `skus/${id}/prices/${priceId}`, "DELETE", authorization);
    }
};
exports.ProductsProxyController = ProductsProxyController;
__decorate([
    (0, common_1.Post)("products"),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)("products"),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.ProductQueryDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "listProducts", null);
__decorate([
    (0, common_1.Get)("products/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Patch)("products/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)("products/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Post)("products/:id/categories"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.AssignCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "assignCategory", null);
__decorate([
    (0, common_1.Delete)("products/:id/categories/:categoryId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("categoryId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.Post)("products/:id/images"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.CreateProductImageDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "createImage", null);
__decorate([
    (0, common_1.Patch)("products/:id/images/:imageId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("imageId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, catalog_proxy_dto_1.UpdateProductImageDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)("products/:id/images/:imageId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("imageId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Post)("products/:id/skus"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.CreateSkuDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "createSku", null);
__decorate([
    (0, common_1.Get)("products/:id/skus"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "listSkus", null);
__decorate([
    (0, common_1.Get)("skus/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "getSku", null);
__decorate([
    (0, common_1.Patch)("skus/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.UpdateSkuDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "updateSku", null);
__decorate([
    (0, common_1.Delete)("skus/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "deleteSku", null);
__decorate([
    (0, common_1.Post)("skus/:id/prices"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.CreatePriceDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "createPrice", null);
__decorate([
    (0, common_1.Get)("skus/:id/prices"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "listPrices", null);
__decorate([
    (0, common_1.Patch)("skus/:id/prices/:priceId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("priceId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, catalog_proxy_dto_1.UpdatePriceDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "updatePrice", null);
__decorate([
    (0, common_1.Delete)("skus/:id/prices/:priceId"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("priceId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsProxyController.prototype, "deletePrice", null);
exports.ProductsProxyController = ProductsProxyController = __decorate([
    (0, swagger_1.ApiTags)("catalog-products"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [catalog_proxy_service_1.CatalogProxyService])
], ProductsProxyController);
let WarehousesProxyController = class WarehousesProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    create(authorization, body, response) {
        return this.send(response, "warehouses", "POST", authorization, body);
    }
    list(authorization, response) {
        return this.send(response, "warehouses", "GET", authorization);
    }
    update(id, authorization, body, response) {
        return this.send(response, `warehouses/${id}`, "PATCH", authorization, body);
    }
    delete(id, authorization, response) {
        return this.send(response, `warehouses/${id}`, "DELETE", authorization);
    }
};
exports.WarehousesProxyController = WarehousesProxyController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.CreateWarehouseDto, Object]),
    __metadata("design:returntype", void 0)
], WarehousesProxyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WarehousesProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, catalog_proxy_dto_1.UpdateWarehouseDto, Object]),
    __metadata("design:returntype", void 0)
], WarehousesProxyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], WarehousesProxyController.prototype, "delete", null);
exports.WarehousesProxyController = WarehousesProxyController = __decorate([
    (0, swagger_1.ApiTags)("catalog-warehouses"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("warehouses"),
    __metadata("design:paramtypes", [catalog_proxy_service_1.CatalogProxyService])
], WarehousesProxyController);
let InventoryProxyController = class InventoryProxyController extends ProxyController {
    constructor(proxy) {
        super(proxy);
    }
    list(authorization, query, response) {
        return this.send(response, "inventory", "GET", authorization, undefined, {
            ...query,
        });
    }
    movements(authorization, query, response) {
        return this.send(response, "inventory/movements", "GET", authorization, undefined, { ...query });
    }
    adjust(authorization, body, response) {
        return this.send(response, "inventory/adjustments", "POST", authorization, body);
    }
    reserve(authorization, body, response) {
        return this.send(response, "inventory/reservations", "POST", authorization, body);
    }
    getReservation(id, authorization, response) {
        return this.send(response, `inventory/reservations/${id}`, "GET", authorization);
    }
    confirm(id, authorization, response) {
        return this.send(response, `inventory/reservations/${id}/confirm`, "POST", authorization);
    }
    release(id, authorization, response) {
        return this.send(response, `inventory/reservations/${id}/release`, "POST", authorization);
    }
    getStock(warehouseId, skuId, authorization, response) {
        return this.send(response, `inventory/${warehouseId}/${skuId}`, "GET", authorization);
    }
};
exports.InventoryProxyController = InventoryProxyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.InventoryQueryDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("movements"),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.InventoryQueryDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "movements", null);
__decorate([
    (0, common_1.Post)("adjustments"),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.StockAdjustmentDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "adjust", null);
__decorate([
    (0, common_1.Post)("reservations"),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, catalog_proxy_dto_1.CreateReservationDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "reserve", null);
__decorate([
    (0, common_1.Get)("reservations/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "getReservation", null);
__decorate([
    (0, common_1.Post)("reservations/:id/confirm"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)("reservations/:id/release"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "release", null);
__decorate([
    (0, common_1.Get)(":warehouseId/:skuId"),
    __param(0, (0, common_1.Param)("warehouseId")),
    __param(1, (0, common_1.Param)("skuId")),
    __param(2, (0, common_1.Headers)("authorization")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], InventoryProxyController.prototype, "getStock", null);
exports.InventoryProxyController = InventoryProxyController = __decorate([
    (0, swagger_1.ApiTags)("inventory"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("inventory"),
    __metadata("design:paramtypes", [catalog_proxy_service_1.CatalogProxyService])
], InventoryProxyController);
//# sourceMappingURL=catalog-proxy.controller.js.map