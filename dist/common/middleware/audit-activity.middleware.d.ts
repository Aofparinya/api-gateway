import { type NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { NextFunction, Request, Response } from "express";
export declare class AuditActivityMiddleware implements NestMiddleware {
    private readonly auditUrl;
    private readonly internalKey;
    constructor(config: ConfigService);
    use(request: Request, response: Response, next: NextFunction): void;
    private actor;
}
