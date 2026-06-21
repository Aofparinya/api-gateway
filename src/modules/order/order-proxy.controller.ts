import {
  Body,
  Controller,
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
import {
  CreateOrderDto,
  OrderQueryDto,
  PageQueryDto,
  RefundDto,
  UpdateOrderDto,
  VersionDto,
} from "./dto/order-proxy.dto";
import { OrderProxyService } from "./order-proxy.service";

type QueryValue = string | number | boolean | undefined;

abstract class ProxyController {
  constructor(protected readonly proxy: OrderProxyService) {}

  protected async send(
    response: Response,
    path: string,
    method: string,
    authorization: string | undefined,
    idempotencyKey?: string,
    body?: unknown,
    query?: Record<string, QueryValue>,
  ): Promise<void> {
    const result = await this.proxy.forward(
      path,
      method,
      authorization,
      idempotencyKey,
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

@ApiTags("orders")
@ApiBearerAuth()
@Controller("orders")
export class OrdersProxyController extends ProxyController {
  constructor(proxy: OrderProxyService) {
    super(proxy);
  }

  @Post()
  create(
    @Headers("authorization") authorization: string | undefined,
    @Headers("idempotency-key") idempotencyKey: string | undefined,
    @Body() body: CreateOrderDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      "orders",
      "POST",
      authorization,
      idempotencyKey,
      body,
    );
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Query() query: OrderQueryDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      "orders",
      "GET",
      authorization,
      undefined,
      undefined,
      {
        ...query,
      },
    );
  }

  @Get(":id")
  get(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `orders/${id}`, "GET", authorization);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Headers("idempotency-key") idempotencyKey: string | undefined,
    @Body() body: UpdateOrderDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `orders/${id}`,
      "PATCH",
      authorization,
      idempotencyKey,
      body,
    );
  }

  @Post(":id/submit")
  submit(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Body() body: VersionDto,
    @Res() response: Response,
  ) {
    return this.action(response, id, "submit", headers, body);
  }

  @Post(":id/cancel")
  cancel(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Body() body: VersionDto,
    @Res() response: Response,
  ) {
    return this.action(response, id, "cancel", headers, body);
  }

  @Post(":id/process")
  process(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Body() body: VersionDto,
    @Res() response: Response,
  ) {
    return this.action(response, id, "process", headers, body);
  }

  @Post(":id/complete")
  complete(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Body() body: VersionDto,
    @Res() response: Response,
  ) {
    return this.action(response, id, "complete", headers, body);
  }

  @Get(":id/history")
  history(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `orders/${id}/history`, "GET", authorization);
  }

  @Post(":id/payments")
  createPayment(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `orders/${id}/payments`,
      "POST",
      headers.authorization,
      headers["idempotency-key"],
      {},
    );
  }

  @Get(":id/payments")
  payments(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `orders/${id}/payments`, "GET", authorization);
  }

  @Get(":id/invoice")
  invoice(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `orders/${id}/invoice`, "GET", authorization);
  }

  private action(
    response: Response,
    id: string,
    action: string,
    headers: Record<string, string>,
    body: VersionDto,
  ) {
    return this.send(
      response,
      `orders/${id}/${action}`,
      "POST",
      headers.authorization,
      headers["idempotency-key"],
      body,
    );
  }
}

@ApiTags("payments")
@ApiBearerAuth()
@Controller("payments")
export class PaymentsProxyController extends ProxyController {
  constructor(proxy: OrderProxyService) {
    super(proxy);
  }

  @Get(":id")
  get(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `payments/${id}`, "GET", authorization);
  }

  @Get(":id/checkout")
  checkout(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `payments/${id}/checkout`, "GET", authorization);
  }

  @Post(":id/retry-checkout")
  retryCheckout(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `payments/${id}/retry-checkout`,
      "POST",
      headers.authorization,
      headers["idempotency-key"],
      {},
    );
  }

  @Post(":id/capture")
  capture(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `payments/${id}/capture`,
      "POST",
      headers.authorization,
      headers["idempotency-key"],
      {},
    );
  }

  @Post(":id/void")
  void(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `payments/${id}/void`,
      "POST",
      headers.authorization,
      headers["idempotency-key"],
      {},
    );
  }

  @Post(":id/refunds")
  refund(
    @Param("id") id: string,
    @Headers() headers: Record<string, string>,
    @Body() body: RefundDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `payments/${id}/refunds`,
      "POST",
      headers.authorization,
      headers["idempotency-key"],
      body,
    );
  }

  @Get(":id/refunds")
  refunds(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `payments/${id}/refunds`, "GET", authorization);
  }
}

@ApiTags("invoices")
@ApiBearerAuth()
@Controller("invoices")
export class InvoicesProxyController extends ProxyController {
  constructor(proxy: OrderProxyService) {
    super(proxy);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Query() query: PageQueryDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      "invoices",
      "GET",
      authorization,
      undefined,
      undefined,
      { ...query },
    );
  }

  @Get(":id")
  get(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `invoices/${id}`, "GET", authorization);
  }
}

@ApiTags("refunds")
@ApiBearerAuth()
@Controller("refunds")
export class RefundsProxyController extends ProxyController {
  constructor(proxy: OrderProxyService) {
    super(proxy);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Query() query: PageQueryDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      "refunds",
      "GET",
      authorization,
      undefined,
      undefined,
      { ...query },
    );
  }

  @Get(":id")
  get(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `refunds/${id}`, "GET", authorization);
  }
}
