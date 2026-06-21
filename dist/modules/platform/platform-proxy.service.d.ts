import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
export type ServiceName = "common" | "storage" | "notification" | "audit" | "report";
type Query = Record<string, string | number | boolean | undefined>;
export declare class PlatformProxyService {
    private readonly request;
    private readonly urls;
    constructor(config: ConfigService, request: Request);
    forward(service: ServiceName, path: string, method: string, authorization?: string, body?: unknown, query?: Query, correlationId?: string): Promise<{
        status: number;
        body: unknown;
    }>;
    upload(path: string, authorization: string | undefined, file: {
        buffer: Buffer;
        originalname: string;
        mimetype: string;
    }, fields: Record<string, string>, correlationId?: string): Promise<{
        status: number;
        body: unknown;
    }>;
    private correlationHeaders;
}
export {};
