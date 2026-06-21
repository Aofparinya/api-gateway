import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
export declare class AuthProxyService {
    private readonly request;
    private readonly baseUrl;
    constructor(config: ConfigService, request: Request);
    forward(path: string, method: string, body?: unknown, authorization?: string): Promise<{
        status: number;
        body: unknown;
    }>;
    private correlationHeaders;
}
