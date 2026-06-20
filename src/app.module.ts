import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { HealthModule } from "./health/health.module";
import { AuthProxyModule } from "./modules/auth/auth-proxy.module";
import { CatalogProxyModule } from "./modules/catalog/catalog-proxy.module";
import { CustomerProxyModule } from "./modules/customer/customer-proxy.module";
import { OrderProxyModule } from "./modules/order/order-proxy.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "test", "production")
          .default("development"),
        PORT: Joi.number().port().default(3000),
        CORS_ORIGIN: Joi.string().default("*"),
        AUTH_SERVICE_URL: Joi.string().uri().default("http://localhost:3001"),
        CUSTOMER_SERVICE_URL: Joi.string()
          .uri()
          .default("http://localhost:3002"),
        CATALOG_SERVICE_URL: Joi.string()
          .uri()
          .default("http://localhost:3003"),
        ORDER_SERVICE_URL: Joi.string().uri().default("http://localhost:3005"),
      }),
    }),
    AuthProxyModule,
    CatalogProxyModule,
    CustomerProxyModule,
    OrderProxyModule,
    HealthModule,
  ],
})
export class AppModule {}
