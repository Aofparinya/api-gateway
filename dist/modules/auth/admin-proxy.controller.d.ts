import type { Response } from "express";
import { AuthProxyService } from "./auth-proxy.service";
import { AssignRolesDto, CreateUserDto, UpdateUserDto } from "./dto/auth-proxy.dto";
declare abstract class AdminProxyController {
    protected readonly proxy: AuthProxyService;
    constructor(proxy: AuthProxyService);
    protected send(response: Response, path: string, method: string, authorization: string | undefined, body?: unknown): Promise<void>;
}
export declare class UsersProxyController extends AdminProxyController {
    constructor(proxy: AuthProxyService);
    create(authorization: string | undefined, body: CreateUserDto, response: Response): Promise<void>;
    list(authorization: string | undefined, response: Response): Promise<void>;
    get(id: string, authorization: string | undefined, response: Response): Promise<void>;
    update(id: string, authorization: string | undefined, body: UpdateUserDto, response: Response): Promise<void>;
    assignRoles(id: string, authorization: string | undefined, body: AssignRolesDto, response: Response): Promise<void>;
}
export declare class RolesProxyController extends AdminProxyController {
    constructor(proxy: AuthProxyService);
    list(authorization: string | undefined, response: Response): Promise<void>;
}
export declare class PermissionsProxyController extends AdminProxyController {
    constructor(proxy: AuthProxyService);
    list(authorization: string | undefined, response: Response): Promise<void>;
}
export {};
