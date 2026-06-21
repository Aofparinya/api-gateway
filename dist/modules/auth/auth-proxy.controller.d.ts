import { Response } from "express";
import { AuthProxyService } from "./auth-proxy.service";
import { LoginDto, LogoutDto, RefreshTokenDto, RegisterDto, ServiceTokenDto, ValidateTokenDto } from "./dto/auth-proxy.dto";
export declare class AuthProxyController {
    private readonly proxy;
    constructor(proxy: AuthProxyService);
    login(body: LoginDto, response: Response): Promise<void>;
    register(body: RegisterDto, response: Response): Promise<void>;
    refresh(body: RefreshTokenDto, response: Response): Promise<void>;
    logout(body: LogoutDto, response: Response): Promise<void>;
    validate(body: ValidateTokenDto, response: Response): Promise<void>;
    serviceToken(body: ServiceTokenDto, response: Response): Promise<void>;
    me(authorization: string | undefined, response: Response): Promise<void>;
    private send;
}
