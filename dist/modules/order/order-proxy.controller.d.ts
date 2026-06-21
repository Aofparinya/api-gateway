import type { Response } from "express";
import { CreateOrderDto, OrderQueryDto, PageQueryDto, RefundDto, UpdateOrderDto, VersionDto } from "./dto/order-proxy.dto";
import { OrderProxyService } from "./order-proxy.service";
type QueryValue = string | number | boolean | undefined;
declare abstract class ProxyController {
    protected readonly proxy: OrderProxyService;
    constructor(proxy: OrderProxyService);
    protected send(response: Response, path: string, method: string, authorization: string | undefined, idempotencyKey?: string, body?: unknown, query?: Record<string, QueryValue>): Promise<void>;
}
export declare class OrdersProxyController extends ProxyController {
    constructor(proxy: OrderProxyService);
    create(authorization: string | undefined, idempotencyKey: string | undefined, body: CreateOrderDto, response: Response): Promise<void>;
    list(authorization: string | undefined, query: OrderQueryDto, response: Response): Promise<void>;
    get(id: string, authorization: string | undefined, response: Response): Promise<void>;
    update(id: string, authorization: string | undefined, idempotencyKey: string | undefined, body: UpdateOrderDto, response: Response): Promise<void>;
    submit(id: string, headers: Record<string, string>, body: VersionDto, response: Response): Promise<void>;
    cancel(id: string, headers: Record<string, string>, body: VersionDto, response: Response): Promise<void>;
    process(id: string, headers: Record<string, string>, body: VersionDto, response: Response): Promise<void>;
    complete(id: string, headers: Record<string, string>, body: VersionDto, response: Response): Promise<void>;
    history(id: string, authorization: string | undefined, response: Response): Promise<void>;
    createPayment(id: string, headers: Record<string, string>, response: Response): Promise<void>;
    payments(id: string, authorization: string | undefined, response: Response): Promise<void>;
    invoice(id: string, authorization: string | undefined, response: Response): Promise<void>;
    private action;
}
export declare class PaymentsProxyController extends ProxyController {
    constructor(proxy: OrderProxyService);
    get(id: string, authorization: string | undefined, response: Response): Promise<void>;
    checkout(id: string, authorization: string | undefined, response: Response): Promise<void>;
    retryCheckout(id: string, headers: Record<string, string>, response: Response): Promise<void>;
    capture(id: string, headers: Record<string, string>, response: Response): Promise<void>;
    void(id: string, headers: Record<string, string>, response: Response): Promise<void>;
    refund(id: string, headers: Record<string, string>, body: RefundDto, response: Response): Promise<void>;
    refunds(id: string, authorization: string | undefined, response: Response): Promise<void>;
}
export declare class InvoicesProxyController extends ProxyController {
    constructor(proxy: OrderProxyService);
    list(authorization: string | undefined, query: PageQueryDto, response: Response): Promise<void>;
    get(id: string, authorization: string | undefined, response: Response): Promise<void>;
}
export declare class RefundsProxyController extends ProxyController {
    constructor(proxy: OrderProxyService);
    list(authorization: string | undefined, query: PageQueryDto, response: Response): Promise<void>;
    get(id: string, authorization: string | undefined, response: Response): Promise<void>;
}
export {};
