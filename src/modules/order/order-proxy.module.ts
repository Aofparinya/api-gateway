import { Module } from "@nestjs/common";
import {
  InvoicesProxyController,
  OrdersProxyController,
  PaymentsProxyController,
  RefundsProxyController,
} from "./order-proxy.controller";
import { OrderProxyService } from "./order-proxy.service";

@Module({
  controllers: [
    OrdersProxyController,
    PaymentsProxyController,
    InvoicesProxyController,
    RefundsProxyController,
  ],
  providers: [OrderProxyService],
})
export class OrderProxyModule {}
