import type { Response } from "express";
import { PlatformProxyService, type ServiceName } from "./platform-proxy.service";
type Upload = {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
};
declare abstract class BaseController {
    protected readonly proxy: PlatformProxyService;
    private readonly service;
    protected constructor(proxy: PlatformProxyService, service: ServiceName);
    protected send(response: Response, path: string, method: string, authorization?: string, body?: unknown, query?: Record<string, string | undefined>, correlationId?: string): Promise<Response<any, Record<string, any>>>;
}
export declare class CommonProxyController extends BaseController {
    constructor(proxy: PlatformProxyService);
    types(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    createType(r: Response, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    items(r: Response, t: string, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    createItem(r: Response, t: string, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    updateItem(r: Response, t: string, id: string, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    deleteItem(r: Response, t: string, id: string, a?: string): Promise<Response<any, Record<string, any>>>;
    configs(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    updateConfig(r: Response, key: string, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    flags(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    updateFlag(r: Response, key: string, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    provinces(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    districts(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    subdistricts(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    searchLocations(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
}
export declare class StorageProxyController extends BaseController {
    constructor(proxy: PlatformProxyService);
    uploadFile(r: Response, file: Upload, fields: Record<string, string>, a?: string, c?: string): Promise<Response<any, Record<string, any>>>;
    list(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    get(r: Response, id: string, a?: string): Promise<Response<any, Record<string, any>>>;
    url(r: Response, id: string, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    remove(r: Response, id: string, a?: string): Promise<Response<any, Record<string, any>>>;
}
export declare class NotificationProxyController extends BaseController {
    constructor(p: PlatformProxyService);
    list(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    unread(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    read(r: Response, id: string, a?: string): Promise<Response<any, Record<string, any>>>;
    all(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    sendNotice(r: Response, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
}
export declare class TemplateProxyController extends BaseController {
    constructor(p: PlatformProxyService);
    list(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    create(r: Response, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    update(r: Response, id: string, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    remove(r: Response, id: string, a?: string): Promise<Response<any, Record<string, any>>>;
}
export declare class AuditProxyController extends BaseController {
    constructor(p: PlatformProxyService);
    list(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    get(r: Response, id: string, a?: string): Promise<Response<any, Record<string, any>>>;
}
export declare class ReportProxyController extends BaseController {
    constructor(p: PlatformProxyService);
    dashboard(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    sales(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    orders(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    payments(r: Response, q: Record<string, string>, a?: string): Promise<Response<any, Record<string, any>>>;
    create(r: Response, b: unknown, a?: string): Promise<Response<any, Record<string, any>>>;
    exports(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
    export(r: Response, id: string, a?: string): Promise<Response<any, Record<string, any>>>;
    rebuild(r: Response, a?: string): Promise<Response<any, Record<string, any>>>;
}
export {};
