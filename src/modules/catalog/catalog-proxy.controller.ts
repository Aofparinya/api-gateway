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
import { CatalogProxyService } from "./catalog-proxy.service";
import {
  AssignCategoryDto,
  CreateCategoryDto,
  CreatePriceDto,
  CreateProductDto,
  CreateProductImageDto,
  CreateReservationDto,
  CreateSkuDto,
  CreateWarehouseDto,
  InventoryQueryDto,
  ProductQueryDto,
  StockAdjustmentDto,
  UpdateCategoryDto,
  UpdatePriceDto,
  UpdateProductDto,
  UpdateProductImageDto,
  UpdateSkuDto,
  UpdateWarehouseDto,
} from "./dto/catalog-proxy.dto";

type QueryValue = string | number | boolean | undefined;

abstract class ProxyController {
  constructor(protected readonly proxy: CatalogProxyService) {}

  protected async send(
    response: Response,
    path: string,
    method: string,
    authorization: string | undefined,
    body?: unknown,
    query?: Record<string, QueryValue>,
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

@ApiTags("catalog-categories")
@ApiBearerAuth()
@Controller("categories")
export class CategoriesProxyController extends ProxyController {
  constructor(proxy: CatalogProxyService) {
    super(proxy);
  }

  @Post()
  create(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateCategoryDto,
    @Res() response: Response,
  ) {
    return this.send(response, "categories", "POST", authorization, body);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, "categories", "GET", authorization);
  }

  @Get(":id")
  get(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `categories/${id}`, "GET", authorization);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateCategoryDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `categories/${id}`,
      "PATCH",
      authorization,
      body,
    );
  }

  @Delete(":id")
  delete(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `categories/${id}`, "DELETE", authorization);
  }
}

@ApiTags("catalog-products")
@ApiBearerAuth()
@Controller()
export class ProductsProxyController extends ProxyController {
  constructor(proxy: CatalogProxyService) {
    super(proxy);
  }

  @Post("products")
  createProduct(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateProductDto,
    @Res() response: Response,
  ) {
    return this.send(response, "products", "POST", authorization, body);
  }

  @Get("products")
  listProducts(
    @Headers("authorization") authorization: string | undefined,
    @Query() query: ProductQueryDto,
    @Res() response: Response,
  ) {
    return this.send(response, "products", "GET", authorization, undefined, {
      ...query,
    });
  }

  @Get("products/:id")
  getProduct(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `products/${id}`, "GET", authorization);
  }

  @Patch("products/:id")
  updateProduct(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateProductDto,
    @Res() response: Response,
  ) {
    return this.send(response, `products/${id}`, "PATCH", authorization, body);
  }

  @Delete("products/:id")
  deleteProduct(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `products/${id}`, "DELETE", authorization);
  }

  @Post("products/:id/categories")
  assignCategory(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: AssignCategoryDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `products/${id}/categories`,
      "POST",
      authorization,
      body,
    );
  }

  @Delete("products/:id/categories/:categoryId")
  removeCategory(
    @Param("id") id: string,
    @Param("categoryId") categoryId: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `products/${id}/categories/${categoryId}`,
      "DELETE",
      authorization,
    );
  }

  @Post("products/:id/images")
  createImage(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateProductImageDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `products/${id}/images`,
      "POST",
      authorization,
      body,
    );
  }

  @Patch("products/:id/images/:imageId")
  updateImage(
    @Param("id") id: string,
    @Param("imageId") imageId: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateProductImageDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `products/${id}/images/${imageId}`,
      "PATCH",
      authorization,
      body,
    );
  }

  @Delete("products/:id/images/:imageId")
  deleteImage(
    @Param("id") id: string,
    @Param("imageId") imageId: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `products/${id}/images/${imageId}`,
      "DELETE",
      authorization,
    );
  }

  @Post("products/:id/skus")
  createSku(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateSkuDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `products/${id}/skus`,
      "POST",
      authorization,
      body,
    );
  }

  @Get("products/:id/skus")
  listSkus(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `products/${id}/skus`, "GET", authorization);
  }

  @Get("skus/:id")
  getSku(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `skus/${id}`, "GET", authorization);
  }

  @Patch("skus/:id")
  updateSku(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateSkuDto,
    @Res() response: Response,
  ) {
    return this.send(response, `skus/${id}`, "PATCH", authorization, body);
  }

  @Delete("skus/:id")
  deleteSku(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `skus/${id}`, "DELETE", authorization);
  }

  @Post("skus/:id/prices")
  createPrice(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreatePriceDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `skus/${id}/prices`,
      "POST",
      authorization,
      body,
    );
  }

  @Get("skus/:id/prices")
  listPrices(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `skus/${id}/prices`, "GET", authorization);
  }

  @Patch("skus/:id/prices/:priceId")
  updatePrice(
    @Param("id") id: string,
    @Param("priceId") priceId: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdatePriceDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `skus/${id}/prices/${priceId}`,
      "PATCH",
      authorization,
      body,
    );
  }

  @Delete("skus/:id/prices/:priceId")
  deletePrice(
    @Param("id") id: string,
    @Param("priceId") priceId: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `skus/${id}/prices/${priceId}`,
      "DELETE",
      authorization,
    );
  }
}

@ApiTags("catalog-warehouses")
@ApiBearerAuth()
@Controller("warehouses")
export class WarehousesProxyController extends ProxyController {
  constructor(proxy: CatalogProxyService) {
    super(proxy);
  }

  @Post()
  create(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateWarehouseDto,
    @Res() response: Response,
  ) {
    return this.send(response, "warehouses", "POST", authorization, body);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, "warehouses", "GET", authorization);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateWarehouseDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `warehouses/${id}`,
      "PATCH",
      authorization,
      body,
    );
  }

  @Delete(":id")
  delete(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `warehouses/${id}`, "DELETE", authorization);
  }
}

@ApiTags("inventory")
@ApiBearerAuth()
@Controller("inventory")
export class InventoryProxyController extends ProxyController {
  constructor(proxy: CatalogProxyService) {
    super(proxy);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Query() query: InventoryQueryDto,
    @Res() response: Response,
  ) {
    return this.send(response, "inventory", "GET", authorization, undefined, {
      ...query,
    });
  }

  @Get("movements")
  movements(
    @Headers("authorization") authorization: string | undefined,
    @Query() query: InventoryQueryDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      "inventory/movements",
      "GET",
      authorization,
      undefined,
      { ...query },
    );
  }

  @Post("adjustments")
  adjust(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: StockAdjustmentDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      "inventory/adjustments",
      "POST",
      authorization,
      body,
    );
  }

  @Post("reservations")
  reserve(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateReservationDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      "inventory/reservations",
      "POST",
      authorization,
      body,
    );
  }

  @Get("reservations/:id")
  getReservation(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `inventory/reservations/${id}`,
      "GET",
      authorization,
    );
  }

  @Post("reservations/:id/confirm")
  confirm(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `inventory/reservations/${id}/confirm`,
      "POST",
      authorization,
    );
  }

  @Post("reservations/:id/release")
  release(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `inventory/reservations/${id}/release`,
      "POST",
      authorization,
    );
  }

  @Get(":warehouseId/:skuId")
  getStock(
    @Param("warehouseId") warehouseId: string,
    @Param("skuId") skuId: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `inventory/${warehouseId}/${skuId}`,
      "GET",
      authorization,
    );
  }
}
