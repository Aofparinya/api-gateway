import { Transform, Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from "@nestjs/swagger";

const statuses = ["ACTIVE", "INACTIVE"] as const;
const productStatuses = ["DRAFT", "ACTIVE", "INACTIVE"] as const;

export class CreateCategoryDto {
  @ApiProperty({ example: "APPAREL" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;

  @ApiProperty({ example: "Apparel" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ format: "uuid" })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiPropertyOptional({ enum: statuses, default: "ACTIVE" })
  @IsOptional()
  @IsIn(statuses)
  status?: (typeof statuses)[number];
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CreateProductDto {
  @ApiProperty({ example: "Classic T-Shirt" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: productStatuses, default: "DRAFT" })
  @IsOptional()
  @IsIn(productStatuses)
  status?: (typeof productStatuses)[number];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ format: "uuid" })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ enum: productStatuses })
  @IsOptional()
  @IsIn(productStatuses)
  status?: (typeof productStatuses)[number];

  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ default: 20, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize = 20;
}

export class AssignCategoryDto {
  @ApiProperty({ format: "uuid" })
  @IsUUID()
  categoryId!: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class CreateProductImageDto {
  @ApiProperty({ format: "uuid" })
  @IsUUID()
  fileId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class UpdateProductImageDto extends PartialType(
  OmitType(CreateProductImageDto, ["fileId"] as const),
) {}

export class CreateSkuDto {
  @ApiProperty({ example: "TSHIRT-BLK-XL" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;

  @ApiPropertyOptional({ example: "8850000000001" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  barcode?: string;

  @ApiProperty({ example: "Classic T-Shirt Black XL" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional({
    type: "object",
    additionalProperties: true,
    example: { color: "black", size: "XL" },
  })
  @IsOptional()
  @IsObject()
  attributes?: Record<string, unknown>;

  @ApiPropertyOptional({ enum: statuses, default: "ACTIVE" })
  @IsOptional()
  @IsIn(statuses)
  status?: (typeof statuses)[number];
}

export class UpdateSkuDto extends PartialType(CreateSkuDto) {}

export class CreatePriceDto {
  @ApiProperty({ example: 499 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount!: number;

  @ApiProperty({ example: "THB" })
  @IsString()
  @Length(3, 3)
  currency!: string;

  @ApiProperty({ example: "2026-06-20T00:00:00Z" })
  @IsDateString()
  validFrom!: string;

  @ApiPropertyOptional({ example: "2026-12-31T23:59:59Z" })
  @IsOptional()
  @IsDateString()
  validTo?: string;
}

export class UpdatePriceDto extends PartialType(CreatePriceDto) {}

export class CreateWarehouseDto {
  @ApiProperty({ example: "BKK-01" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;

  @ApiProperty({ example: "Bangkok Main Warehouse" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional({ enum: statuses, default: "ACTIVE" })
  @IsOptional()
  @IsIn(statuses)
  status?: (typeof statuses)[number];
}

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {}

export class InventoryQueryDto {
  @ApiPropertyOptional({ format: "uuid" })
  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @ApiPropertyOptional({ format: "uuid" })
  @IsOptional()
  @IsUUID()
  skuId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === true || value === "true")
  @IsBoolean()
  lowStock?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ default: 20, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize = 20;
}

export class StockAdjustmentDto {
  @ApiProperty({ format: "uuid" })
  @IsUUID()
  warehouseId!: string;

  @ApiProperty({ format: "uuid" })
  @IsUUID()
  skuId!: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  quantity!: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  reorderLevel?: number;

  @ApiPropertyOptional({ example: "PURCHASE_ORDER" })
  @IsOptional()
  @IsString()
  referenceType?: string;

  @ApiPropertyOptional({ example: "PO-20260620-001" })
  @IsOptional()
  @IsString()
  referenceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class ReservationItemDto {
  @ApiProperty({ format: "uuid" })
  @IsUUID()
  skuId!: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateReservationDto {
  @ApiProperty({ format: "uuid" })
  @IsUUID()
  warehouseId!: string;

  @ApiProperty({ example: "ORDER" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  referenceType!: string;

  @ApiProperty({ example: "ORD-20260620-000001" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  referenceId!: string;

  @ApiProperty({ example: "2026-06-20T12:30:00Z" })
  @IsDateString()
  expiresAt!: string;

  @ApiProperty({ type: [ReservationItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReservationItemDto)
  items!: ReservationItemDto[];
}
