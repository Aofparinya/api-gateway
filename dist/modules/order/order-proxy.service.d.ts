import { ConfigService } from "@nestjs/config";
type QueryValue = string | number | boolean | undefined;
export declare class OrderProxyService {
    private readonly baseUrl;
    constructor(config: ConfigService);
    forward(path: string, method: string, authorization: string | undefined, idempotencyKey?: string, body?: unknown, query?: Record<string, QueryValue>): Promise<{
        status: number;
        body: unknown;
    }>;
}
export {};
