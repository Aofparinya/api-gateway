import { Module } from "@nestjs/common";
import {
  CategoriesProxyController,
  InventoryProxyController,
  ProductsProxyController,
  WarehousesProxyController,
} from "./catalog-proxy.controller";
import { CatalogProxyService } from "./catalog-proxy.service";

@Module({
  controllers: [
    CategoriesProxyController,
    ProductsProxyController,
    WarehousesProxyController,
    InventoryProxyController,
  ],
  providers: [CatalogProxyService],
})
export class CatalogProxyModule {}
