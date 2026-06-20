import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { CustomerProxyService } from "./customer-proxy.service";
import {
  CreateAddressDto,
  CreateContactDto,
  CreateCustomerDto,
  CreateTaxProfileDto,
  CustomerQueryDto,
  UpdateAddressDto,
  UpdateContactDto,
  UpdateCustomerDto,
  UpdateTaxProfileDto,
} from "./dto/customer-proxy.dto";

@ApiTags("customers")
@ApiBearerAuth()
@Controller("customers")
export class CustomerProxyController {
  constructor(private readonly proxy: CustomerProxyService) {}

  @Post()
  createCustomer(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateCustomerDto,
    @Res() response: Response,
  ) {
    return this.send(response, "customers", "POST", authorization, body);
  }

  @Get()
  listCustomers(
    @Headers("authorization") authorization: string | undefined,
    @Query() query: CustomerQueryDto,
    @Res() response: Response,
  ) {
    return this.send(response, "customers", "GET", authorization, undefined, {
      ...query,
    });
  }

  @Get(":id")
  getCustomer(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `customers/${id}`, "GET", authorization);
  }

  @Patch(":id")
  updateCustomer(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateCustomerDto,
    @Res() response: Response,
  ) {
    return this.send(response, `customers/${id}`, "PATCH", authorization, body);
  }

  @Delete(":id")
  deleteCustomer(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `customers/${id}`, "DELETE", authorization);
  }

  @Post(":id/addresses")
  createAddress(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateAddressDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/addresses`,
      "POST",
      authorization,
      body,
    );
  }

  @Get(":id/addresses")
  listAddresses(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/addresses`,
      "GET",
      authorization,
    );
  }

  @Patch(":id/addresses/:addressId")
  updateAddress(
    @Param("id") id: string,
    @Param("addressId") addressId: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateAddressDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/addresses/${addressId}`,
      "PATCH",
      authorization,
      body,
    );
  }

  @Delete(":id/addresses/:addressId")
  deleteAddress(
    @Param("id") id: string,
    @Param("addressId") addressId: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/addresses/${addressId}`,
      "DELETE",
      authorization,
    );
  }

  @Post(":id/contacts")
  createContact(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateContactDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/contacts`,
      "POST",
      authorization,
      body,
    );
  }

  @Get(":id/contacts")
  listContacts(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/contacts`,
      "GET",
      authorization,
    );
  }

  @Patch(":id/contacts/:contactId")
  updateContact(
    @Param("id") id: string,
    @Param("contactId") contactId: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateContactDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/contacts/${contactId}`,
      "PATCH",
      authorization,
      body,
    );
  }

  @Delete(":id/contacts/:contactId")
  deleteContact(
    @Param("id") id: string,
    @Param("contactId") contactId: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/contacts/${contactId}`,
      "DELETE",
      authorization,
    );
  }

  @Post(":id/tax-profiles")
  createTaxProfile(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateTaxProfileDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/tax-profiles`,
      "POST",
      authorization,
      body,
    );
  }

  @Get(":id/tax-profiles")
  listTaxProfiles(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/tax-profiles`,
      "GET",
      authorization,
    );
  }

  @Patch(":id/tax-profiles/:taxProfileId")
  updateTaxProfile(
    @Param("id") id: string,
    @Param("taxProfileId") taxProfileId: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateTaxProfileDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/tax-profiles/${taxProfileId}`,
      "PATCH",
      authorization,
      body,
    );
  }

  @Delete(":id/tax-profiles/:taxProfileId")
  deleteTaxProfile(
    @Param("id") id: string,
    @Param("taxProfileId") taxProfileId: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `customers/${id}/tax-profiles/${taxProfileId}`,
      "DELETE",
      authorization,
    );
  }

  private async send(
    response: Response,
    path: string,
    method: string,
    authorization: string | undefined,
    body?: unknown,
    query?: Record<string, string | number | boolean | undefined>,
  ): Promise<void> {
    const result = await this.proxy.forward(
      path,
      method,
      authorization,
      body,
      query,
    );
    response.status(result.status);
    if (result.body === undefined) {
      response.send();
      return;
    }
    response.json(result.body);
  }
}
