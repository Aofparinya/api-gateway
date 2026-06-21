import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { HealthModule } from "./health/health.module";
import { AuthProxyModule } from "./modules/auth/auth-proxy.module";
import { CatalogProxyModule } from "./modules/catalog/catalog-proxy.module";
import { CustomerProxyModule } from "./modules/customer/customer-proxy.module";
import { OrderProxyModule } from "./modules/order/order-proxy.module";
import { PlatformProxyModule } from "./modules/platform/platform-proxy.module";
import { AuditActivityMiddleware } from "./common/middleware/audit-activity.middleware";

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
        COMMON_SERVICE_URL: Joi.string().uri().default("http://localhost:3006"),
        STORAGE_SERVICE_URL: Joi.string()
          .uri()
          .default("http://localhost:3007"),
        NOTIFICATION_SERVICE_URL: Joi.string()
          .uri()
          .default("http://localhost:3008"),
        AUDIT_SERVICE_URL: Joi.string().uri().default("http://localhost:3009"),
        AUDIT_INTERNAL_KEY: Joi.string()
          .min(16)
          .default("development-audit-internal-key"),
        REPORT_SERVICE_URL: Joi.string().uri().default("http://localhost:3010"),
      }),
    }),
    AuthProxyModule,
    CatalogProxyModule,
    CustomerProxyModule,
    OrderProxyModule,
    PlatformProxyModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditActivityMiddleware).forRoutes("*");
  }
}
