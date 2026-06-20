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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationDto = exports.ReservationItemDto = exports.StockAdjustmentDto = exports.InventoryQueryDto = exports.UpdateWarehouseDto = exports.CreateWarehouseDto = exports.UpdatePriceDto = exports.CreatePriceDto = exports.UpdateSkuDto = exports.CreateSkuDto = exports.UpdateProductImageDto = exports.CreateProductImageDto = exports.AssignCategoryDto = exports.ProductQueryDto = exports.UpdateProductDto = exports.CreateProductDto = exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const statuses = ["ACTIVE", "INACTIVE"];
const productStatuses = ["DRAFT", "ACTIVE", "INACTIVE"];
class CreateCategoryDto {
    code;
    name;
    description;
    parentId;
    status;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "APPAREL" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Apparel" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: "uuid" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: statuses, default: "ACTIVE" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(statuses),
    __metadata("design:type", Object)
], CreateCategoryDto.prototype, "status", void 0);
class UpdateCategoryDto extends (0, swagger_1.PartialType)(CreateCategoryDto) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
class CreateProductDto {
    name;
    description;
    status;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Classic T-Shirt" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: productStatuses, default: "DRAFT" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(productStatuses),
    __metadata("design:type", Object)
], CreateProductDto.prototype, "status", void 0);
class UpdateProductDto extends (0, swagger_1.PartialType)(CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;
class ProductQueryDto {
    q;
    categoryId;
    status;
    page = 1;
    pageSize = 20;
}
exports.ProductQueryDto = ProductQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "q", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: "uuid" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: productStatuses }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(productStatuses),
    __metadata("design:type", Object)
], ProductQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], ProductQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20, maximum: 100 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Object)
], ProductQueryDto.prototype, "pageSize", void 0);
class AssignCategoryDto {
    categoryId;
    isPrimary;
}
exports.AssignCategoryDto = AssignCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AssignCategoryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AssignCategoryDto.prototype, "isPrimary", void 0);
class CreateProductImageDto {
    fileId;
    altText;
    sortOrder;
    isPrimary;
}
exports.CreateProductImageDto = CreateProductImageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProductImageDto.prototype, "fileId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductImageDto.prototype, "altText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateProductImageDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateProductImageDto.prototype, "isPrimary", void 0);
class UpdateProductImageDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(CreateProductImageDto, ["fileId"])) {
}
exports.UpdateProductImageDto = UpdateProductImageDto;
class CreateSkuDto {
    code;
    barcode;
    name;
    attributes;
    status;
}
exports.CreateSkuDto = CreateSkuDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "TSHIRT-BLK-XL" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateSkuDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "8850000000001" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateSkuDto.prototype, "barcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Classic T-Shirt Black XL" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateSkuDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: "object",
        additionalProperties: true,
        example: { color: "black", size: "XL" },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSkuDto.prototype, "attributes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: statuses, default: "ACTIVE" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(statuses),
    __metadata("design:type", Object)
], CreateSkuDto.prototype, "status", void 0);
class UpdateSkuDto extends (0, swagger_1.PartialType)(CreateSkuDto) {
}
exports.UpdateSkuDto = UpdateSkuDto;
class CreatePriceDto {
    amount;
    currency;
    validFrom;
    validTo;
}
exports.CreatePriceDto = CreatePriceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 499 }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePriceDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "THB" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 3),
    __metadata("design:type", String)
], CreatePriceDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-06-20T00:00:00Z" }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePriceDto.prototype, "validFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2026-12-31T23:59:59Z" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePriceDto.prototype, "validTo", void 0);
class UpdatePriceDto extends (0, swagger_1.PartialType)(CreatePriceDto) {
}
exports.UpdatePriceDto = UpdatePriceDto;
class CreateWarehouseDto {
    code;
    name;
    status;
}
exports.CreateWarehouseDto = CreateWarehouseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "BKK-01" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Bangkok Main Warehouse" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: statuses, default: "ACTIVE" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(statuses),
    __metadata("design:type", Object)
], CreateWarehouseDto.prototype, "status", void 0);
class UpdateWarehouseDto extends (0, swagger_1.PartialType)(CreateWarehouseDto) {
}
exports.UpdateWarehouseDto = UpdateWarehouseDto;
class InventoryQueryDto {
    warehouseId;
    skuId;
    lowStock;
    page = 1;
    pageSize = 20;
}
exports.InventoryQueryDto = InventoryQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: "uuid" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], InventoryQueryDto.prototype, "warehouseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ format: "uuid" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], InventoryQueryDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === true || value === "true"),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], InventoryQueryDto.prototype, "lowStock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], InventoryQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 20, maximum: 100 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Object)
], InventoryQueryDto.prototype, "pageSize", void 0);
class StockAdjustmentDto {
    warehouseId;
    skuId;
    quantity;
    reorderLevel;
    referenceType;
    referenceId;
    note;
}
exports.StockAdjustmentDto = StockAdjustmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockAdjustmentDto.prototype, "warehouseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StockAdjustmentDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], StockAdjustmentDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], StockAdjustmentDto.prototype, "reorderLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "PURCHASE_ORDER" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockAdjustmentDto.prototype, "referenceType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "PO-20260620-001" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockAdjustmentDto.prototype, "referenceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StockAdjustmentDto.prototype, "note", void 0);
class ReservationItemDto {
    skuId;
    quantity;
}
exports.ReservationItemDto = ReservationItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ReservationItemDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReservationItemDto.prototype, "quantity", void 0);
class CreateReservationDto {
    warehouseId;
    referenceType;
    referenceId;
    expiresAt;
    items;
}
exports.CreateReservationDto = CreateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: "uuid" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "warehouseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "ORDER" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "referenceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "ORD-20260620-000001" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "referenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-06-20T12:30:00Z" }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReservationItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ReservationItemDto),
    __metadata("design:type", Array)
], CreateReservationDto.prototype, "items", void 0);
//# sourceMappingURL=catalog-proxy.dto.js.map