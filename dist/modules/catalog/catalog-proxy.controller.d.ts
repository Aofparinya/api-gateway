import type { Response } from "express";
import { CatalogProxyService } from "./catalog-proxy.service";
import { AssignCategoryDto, CreateCategoryDto, CreatePriceDto, CreateProductDto, CreateProductImageDto, CreateReservationDto, CreateSkuDto, CreateWarehouseDto, InventoryQueryDto, ProductQueryDto, StockAdjustmentDto, UpdateCategoryDto, UpdatePriceDto, UpdateProductDto, UpdateProductImageDto, UpdateSkuDto, UpdateWarehouseDto } from "./dto/catalog-proxy.dto";
type QueryValue = string | number | boolean | undefined;
declare abstract class ProxyController {
    protected readonly proxy: CatalogProxyService;
    constructor(proxy: CatalogProxyService);
    protected send(response: Response, path: string, method: string, authorization: string | undefined, body?: unknown, query?: Record<string, QueryValue>): Promise<void>;
}
export declare class CategoriesProxyController extends ProxyController {
    constructor(proxy: CatalogProxyService);
    create(authorization: string | undefined, body: CreateCategoryDto, response: Response): Promise<void>;
    list(authorization: string | undefined, response: Response): Promise<void>;
    get(id: string, authorization: string | undefined, response: Response): Promise<void>;
    update(id: string, authorization: string | undefined, body: UpdateCategoryDto, response: Response): Promise<void>;
    delete(id: string, authorization: string | undefined, response: Response): Promise<void>;
}
export declare class ProductsProxyController extends ProxyController {
    constructor(proxy: CatalogProxyService);
    createProduct(authorization: string | undefined, body: CreateProductDto, response: Response): Promise<void>;
    listProducts(authorization: string | undefined, query: ProductQueryDto, response: Response): Promise<void>;
    getProduct(id: string, authorization: string | undefined, response: Response): Promise<void>;
    updateProduct(id: string, authorization: string | undefined, body: UpdateProductDto, response: Response): Promise<void>;
    deleteProduct(id: string, authorization: string | undefined, response: Response): Promise<void>;
    assignCategory(id: string, authorization: string | undefined, body: AssignCategoryDto, response: Response): Promise<void>;
    removeCategory(id: string, categoryId: string, authorization: string | undefined, response: Response): Promise<void>;
    createImage(id: string, authorization: string | undefined, body: CreateProductImageDto, response: Response): Promise<void>;
    updateImage(id: string, imageId: string, authorization: string | undefined, body: UpdateProductImageDto, response: Response): Promise<void>;
    deleteImage(id: string, imageId: string, authorization: string | undefined, response: Response): Promise<void>;
    createSku(id: string, authorization: string | undefined, body: CreateSkuDto, response: Response): Promise<void>;
    listSkus(id: string, authorization: string | undefined, response: Response): Promise<void>;
    getSku(id: string, authorization: string | undefined, response: Response): Promise<void>;
    updateSku(id: string, authorization: string | undefined, body: UpdateSkuDto, response: Response): Promise<void>;
    deleteSku(id: string, authorization: string | undefined, response: Response): Promise<void>;
    createPrice(id: string, authorization: string | undefined, body: CreatePriceDto, response: Response): Promise<void>;
    listPrices(id: string, authorization: string | undefined, response: Response): Promise<void>;
    updatePrice(id: string, priceId: string, authorization: string | undefined, body: UpdatePriceDto, response: Response): Promise<void>;
    deletePrice(id: string, priceId: string, authorization: string | undefined, response: Response): Promise<void>;
}
export declare class WarehousesProxyController extends ProxyController {
    constructor(proxy: CatalogProxyService);
    create(authorization: string | undefined, body: CreateWarehouseDto, response: Response): Promise<void>;
    list(authorization: string | undefined, response: Response): Promise<void>;
    update(id: string, authorization: string | undefined, body: UpdateWarehouseDto, response: Response): Promise<void>;
    delete(id: string, authorization: string | undefined, response: Response): Promise<void>;
}
export declare class InventoryProxyController extends ProxyController {
    constructor(proxy: CatalogProxyService);
    list(authorization: string | undefined, query: InventoryQueryDto, response: Response): Promise<void>;
    movements(authorization: string | undefined, query: InventoryQueryDto, response: Response): Promise<void>;
    adjust(authorization: string | undefined, body: StockAdjustmentDto, response: Response): Promise<void>;
    reserve(authorization: string | undefined, body: CreateReservationDto, response: Response): Promise<void>;
    getReservation(id: string, authorization: string | undefined, response: Response): Promise<void>;
    confirm(id: string, authorization: string | undefined, response: Response): Promise<void>;
    release(id: string, authorization: string | undefined, response: Response): Promise<void>;
    getStock(warehouseId: string, skuId: string, authorization: string | undefined, response: Response): Promise<void>;
}
export {};
