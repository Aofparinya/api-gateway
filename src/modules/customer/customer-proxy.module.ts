import { Module } from "@nestjs/common";
import { CustomerProxyController } from "./customer-proxy.controller";
import { CustomerProxyService } from "./customer-proxy.service";

@Module({
  controllers: [CustomerProxyController],
  providers: [CustomerProxyService],
})
export class CustomerProxyModule {}
