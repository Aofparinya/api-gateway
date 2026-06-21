import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from "class-validator";
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from "@nestjs/swagger";

const customerTypes = ["INDIVIDUAL", "CORPORATE"] as const;
const customerStatuses = ["ACTIVE", "INACTIVE", "BLOCKED"] as const;
const addressTypes = ["BILLING", "SHIPPING", "CONTACT"] as const;
const branchTypes = ["HEAD_OFFICE", "BRANCH"] as const;

export class CreateCustomerDto {
  @ApiPropertyOptional({
    format: "uuid",
    description:
      "Optional external identity for idempotent storefront customers",
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ enum: customerTypes })
  @IsIn(customerTypes)
  customerType!: (typeof customerTypes)[number];

  @ApiPropertyOptional({ enum: customerStatuses, default: "ACTIVE" })
  @IsOptional()
  @IsIn(customerStatuses)
  status?: (typeof customerStatuses)[number];

  @ApiPropertyOptional({ example: "Parinya" })
  @ValidateIf((dto: CreateCustomerDto) => dto.customerType === "INDIVIDUAL")
  @IsString()
  @MaxLength(150)
  firstName?: string;

  @ApiPropertyOptional({ example: "Sakulsantitham" })
  @ValidateIf((dto: CreateCustomerDto) => dto.customerType === "INDIVIDUAL")
  @IsString()
  @MaxLength(150)
  lastName?: string;

  @ApiPropertyOptional({ example: "Order Platform Co., Ltd." })
  @ValidateIf((dto: CreateCustomerDto) => dto.customerType === "CORPORATE")
  @IsString()
  @MaxLength(255)
  companyName?: string;

  @ApiPropertyOptional({ example: "0105559999999" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  registrationNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class UpdateCustomerDto extends PartialType(
  OmitType(CreateCustomerDto, ["customerType"] as const),
) {}

export class CustomerQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: customerTypes })
  @IsOptional()
  @IsIn(customerTypes)
  customerType?: (typeof customerTypes)[number];

  @ApiPropertyOptional({ enum: customerStatuses })
  @IsOptional()
  @IsIn(customerStatuses)
  status?: (typeof customerStatuses)[number];

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

export class CreateAddressDto {
  @ApiProperty({ enum: addressTypes })
  @IsIn(addressTypes)
  addressType!: (typeof addressTypes)[number];

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  line1!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  line2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subdistrict?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(150)
  province!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  postalCode!: string;

  @ApiPropertyOptional({ default: "TH" })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  countryCode?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  @MaxLength(150)
  firstName!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(150)
  lastName!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}

export class CreateTaxProfileDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  taxId!: string;

  @ApiProperty({ enum: branchTypes })
  @IsIn(branchTypes)
  branchType!: (typeof branchTypes)[number];

  @ApiPropertyOptional({
    description: "HEAD_OFFICE is normalized to 00000",
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  branchCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchName?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  addressLine1!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subdistrict?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(150)
  province!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  postalCode!: string;

  @ApiPropertyOptional({ default: "TH" })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  countryCode?: string;
}

export class UpdateTaxProfileDto extends PartialType(CreateTaxProfileDto) {}
