import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
type QueryValue = string | number | boolean | undefined;
export declare class CatalogProxyService {
    private readonly request;
    private readonly baseUrl;
    constructor(config: ConfigService, request: Request);
    forward(path: string, method: string, authorization: string | undefined, body?: unknown, query?: Record<string, QueryValue>): Promise<{
        status: number;
        body: unknown;
    }>;
    private correlationHeaders;
}
export {};
