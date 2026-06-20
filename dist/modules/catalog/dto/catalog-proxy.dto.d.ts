declare const statuses: readonly ["ACTIVE", "INACTIVE"];
declare const productStatuses: readonly ["DRAFT", "ACTIVE", "INACTIVE"];
export declare class CreateCategoryDto {
    code: string;
    name: string;
    description?: string;
    parentId?: string;
    status?: (typeof statuses)[number];
}
declare const UpdateCategoryDto_base: import("@nestjs/common").Type<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    status?: (typeof productStatuses)[number];
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export declare class ProductQueryDto {
    q?: string;
    categoryId?: string;
    status?: (typeof productStatuses)[number];
    page: number;
    pageSize: number;
}
export declare class AssignCategoryDto {
    categoryId: string;
    isPrimary?: boolean;
}
export declare class CreateProductImageDto {
    fileId: string;
    altText?: string;
    sortOrder?: number;
    isPrimary?: boolean;
}
declare const UpdateProductImageDto_base: import("@nestjs/common").Type<Partial<Omit<CreateProductImageDto, "fileId">>>;
export declare class UpdateProductImageDto extends UpdateProductImageDto_base {
}
export declare class CreateSkuDto {
    code: string;
    barcode?: string;
    name: string;
    attributes?: Record<string, unknown>;
    status?: (typeof statuses)[number];
}
declare const UpdateSkuDto_base: import("@nestjs/common").Type<Partial<CreateSkuDto>>;
export declare class UpdateSkuDto extends UpdateSkuDto_base {
}
export declare class CreatePriceDto {
    amount: number;
    currency: string;
    validFrom: string;
    validTo?: string;
}
declare const UpdatePriceDto_base: import("@nestjs/common").Type<Partial<CreatePriceDto>>;
export declare class UpdatePriceDto extends UpdatePriceDto_base {
}
export declare class CreateWarehouseDto {
    code: string;
    name: string;
    status?: (typeof statuses)[number];
}
declare const UpdateWarehouseDto_base: import("@nestjs/common").Type<Partial<CreateWarehouseDto>>;
export declare class UpdateWarehouseDto extends UpdateWarehouseDto_base {
}
export declare class InventoryQueryDto {
    warehouseId?: string;
    skuId?: string;
    lowStock?: boolean;
    page: number;
    pageSize: number;
}
export declare class ReservationQueryDto {
    warehouseId?: string;
    status?: string;
    referenceType?: string;
    referenceId?: string;
    page: number;
    pageSize: number;
}
export declare class StockAdjustmentDto {
    warehouseId: string;
    skuId: string;
    quantity: number;
    reorderLevel?: number;
    referenceType?: string;
    referenceId?: string;
    note?: string;
}
export declare class ReservationItemDto {
    skuId: string;
    quantity: number;
}
export declare class CreateReservationDto {
    warehouseId: string;
    referenceType: string;
    referenceId: string;
    expiresAt: string;
    items: ReservationItemDto[];
}
export {};
