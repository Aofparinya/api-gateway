export declare enum DiscountType {
    NONE = "NONE",
    PERCENT = "PERCENT",
    FIXED = "FIXED"
}
export declare class DiscountDto {
    type: DiscountType;
    value: number;
}
export declare class OrderItemDto {
    skuId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    customerId: string;
    warehouseId: string;
    billingAddressId: string;
    shippingAddressId: string;
    taxProfileId?: string;
    items: OrderItemDto[];
    discount?: DiscountDto;
    note?: string;
}
export declare class UpdateOrderDto extends CreateOrderDto {
    version: number;
    customerId: string;
    warehouseId: string;
}
export declare class VersionDto {
    version: number;
}
export declare class RefundDto {
    amount: number;
    reason: string;
}
export declare class OrderQueryDto {
    q?: string;
    status?: string;
    customerId?: string;
    warehouseId?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    pageSize?: number;
}
export declare class PageQueryDto {
    page?: number;
    pageSize?: number;
}
