declare const customerTypes: readonly ["INDIVIDUAL", "CORPORATE"];
declare const customerStatuses: readonly ["ACTIVE", "INACTIVE", "BLOCKED"];
declare const addressTypes: readonly ["BILLING", "SHIPPING", "CONTACT"];
declare const branchTypes: readonly ["HEAD_OFFICE", "BRANCH"];
export declare class CreateCustomerDto {
    id?: string;
    customerType: (typeof customerTypes)[number];
    status?: (typeof customerStatuses)[number];
    firstName?: string;
    lastName?: string;
    companyName?: string;
    registrationNumber?: string;
    note?: string;
}
declare const UpdateCustomerDto_base: import("@nestjs/common").Type<Partial<Omit<CreateCustomerDto, "customerType">>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
}
export declare class CustomerQueryDto {
    q?: string;
    customerType?: (typeof customerTypes)[number];
    status?: (typeof customerStatuses)[number];
    page: number;
    pageSize: number;
}
export declare class CreateAddressDto {
    addressType: (typeof addressTypes)[number];
    line1: string;
    line2?: string;
    subdistrict?: string;
    district?: string;
    province: string;
    postalCode: string;
    countryCode?: string;
    isDefault?: boolean;
}
declare const UpdateAddressDto_base: import("@nestjs/common").Type<Partial<CreateAddressDto>>;
export declare class UpdateAddressDto extends UpdateAddressDto_base {
}
export declare class CreateContactDto {
    firstName: string;
    lastName: string;
    position?: string;
    email?: string;
    phone?: string;
    isPrimary?: boolean;
}
declare const UpdateContactDto_base: import("@nestjs/common").Type<Partial<CreateContactDto>>;
export declare class UpdateContactDto extends UpdateContactDto_base {
}
export declare class CreateTaxProfileDto {
    taxId: string;
    branchType: (typeof branchTypes)[number];
    branchCode?: string;
    branchName?: string;
    addressLine1: string;
    addressLine2?: string;
    subdistrict?: string;
    district?: string;
    province: string;
    postalCode: string;
    countryCode?: string;
}
declare const UpdateTaxProfileDto_base: import("@nestjs/common").Type<Partial<CreateTaxProfileDto>>;
export declare class UpdateTaxProfileDto extends UpdateTaxProfileDto_base {
}
export {};
