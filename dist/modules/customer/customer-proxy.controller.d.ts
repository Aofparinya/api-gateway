import type { Response } from "express";
import { CustomerProxyService } from "./customer-proxy.service";
import { CreateAddressDto, CreateContactDto, CreateCustomerDto, CreateTaxProfileDto, CustomerQueryDto, UpdateAddressDto, UpdateContactDto, UpdateCustomerDto, UpdateTaxProfileDto } from "./dto/customer-proxy.dto";
export declare class CustomerProxyController {
    private readonly proxy;
    constructor(proxy: CustomerProxyService);
    createCustomer(authorization: string | undefined, body: CreateCustomerDto, response: Response): Promise<void>;
    listCustomers(authorization: string | undefined, query: CustomerQueryDto, response: Response): Promise<void>;
    getCustomer(id: string, authorization: string | undefined, response: Response): Promise<void>;
    updateCustomer(id: string, authorization: string | undefined, body: UpdateCustomerDto, response: Response): Promise<void>;
    deleteCustomer(id: string, authorization: string | undefined, response: Response): Promise<void>;
    createAddress(id: string, authorization: string | undefined, body: CreateAddressDto, response: Response): Promise<void>;
    listAddresses(id: string, authorization: string | undefined, response: Response): Promise<void>;
    updateAddress(id: string, addressId: string, authorization: string | undefined, body: UpdateAddressDto, response: Response): Promise<void>;
    deleteAddress(id: string, addressId: string, authorization: string | undefined, response: Response): Promise<void>;
    createContact(id: string, authorization: string | undefined, body: CreateContactDto, response: Response): Promise<void>;
    listContacts(id: string, authorization: string | undefined, response: Response): Promise<void>;
    updateContact(id: string, contactId: string, authorization: string | undefined, body: UpdateContactDto, response: Response): Promise<void>;
    deleteContact(id: string, contactId: string, authorization: string | undefined, response: Response): Promise<void>;
    createTaxProfile(id: string, authorization: string | undefined, body: CreateTaxProfileDto, response: Response): Promise<void>;
    listTaxProfiles(id: string, authorization: string | undefined, response: Response): Promise<void>;
    updateTaxProfile(id: string, taxProfileId: string, authorization: string | undefined, body: UpdateTaxProfileDto, response: Response): Promise<void>;
    deleteTaxProfile(id: string, taxProfileId: string, authorization: string | undefined, response: Response): Promise<void>;
    private send;
}
