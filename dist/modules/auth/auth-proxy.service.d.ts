import { ConfigService } from "@nestjs/config";
export declare class AuthProxyService {
    private readonly baseUrl;
    constructor(config: ConfigService);
    forward(path: string, method: string, body?: unknown, authorization?: string): Promise<{
        status: number;
        body: unknown;
    }>;
}
