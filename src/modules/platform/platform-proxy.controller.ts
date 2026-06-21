import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import {
  PlatformProxyService,
  type ServiceName,
} from "./platform-proxy.service";

type Upload = { buffer: Buffer; originalname: string; mimetype: string };
abstract class BaseController {
  protected constructor(
    protected readonly proxy: PlatformProxyService,
    private readonly service: ServiceName,
  ) {}
  protected async send(
    response: Response,
    path: string,
    method: string,
    authorization?: string,
    body?: unknown,
    query?: Record<string, string | undefined>,
    correlationId?: string,
  ) {
    const result = await this.proxy.forward(
      this.service,
      path,
      method,
      authorization,
      body,
      query,
      correlationId,
    );
    return response.status(result.status).send(result.body);
  }
}

@ApiTags("Common")
@ApiBearerAuth()
@Controller({ path: "", version: "1" })
export class CommonProxyController extends BaseController {
  constructor(proxy: PlatformProxyService) {
    super(proxy, "common");
  }
  @Get("master-data/types") types(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "master-data/types", "GET", a);
  }
  @Post("master-data/types") createType(
    @Res() r: Response,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "master-data/types", "POST", a, b);
  }
  @Get("master-data/:type") items(
    @Res() r: Response,
    @Param("type") t: string,
    @Query() q: Record<string, string>,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `master-data/${t}`, "GET", a, undefined, q);
  }
  @Post("master-data/:type") createItem(
    @Res() r: Response,
    @Param("type") t: string,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `master-data/${t}`, "POST", a, b);
  }
  @Patch("master-data/:type/:id") updateItem(
    @Res() r: Response,
    @Param("type") t: string,
    @Param("id") id: string,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `master-data/${t}/${id}`, "PATCH", a, b);
  }
  @Delete("master-data/:type/:id") deleteItem(
    @Res() r: Response,
    @Param("type") t: string,
    @Param("id") id: string,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `master-data/${t}/${id}`, "DELETE", a);
  }
  @Get("system-configs") configs(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "system-configs", "GET", a);
  }
  @Patch("system-configs/:key") updateConfig(
    @Res() r: Response,
    @Param("key") key: string,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `system-configs/${key}`, "PATCH", a, b);
  }
  @Get("feature-flags") flags(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "feature-flags", "GET", a);
  }
  @Patch("feature-flags/:key") updateFlag(
    @Res() r: Response,
    @Param("key") key: string,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `feature-flags/${key}`, "PATCH", a, b);
  }
}

@ApiTags("Files")
@ApiBearerAuth()
@Controller({ path: "files", version: "1" })
export class StorageProxyController extends BaseController {
  constructor(proxy: PlatformProxyService) {
    super(proxy, "storage");
  }
  @Post()
  @UseInterceptors(
    FileInterceptor("file", { limits: { fileSize: 20 * 1024 * 1024 } }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
        category: { type: "string" },
        entityType: { type: "string" },
        entityId: { type: "string" },
      },
    },
  })
  async uploadFile(
    @Res() r: Response,
    @UploadedFile() file: Upload,
    @Body() fields: Record<string, string>,
    @Headers("authorization") a?: string,
    @Headers("x-correlation-id") c?: string,
  ) {
    const result = await this.proxy.upload("files", a, file, fields, c);
    return r.status(result.status).send(result.body);
  }
  @Get() list(
    @Res() r: Response,
    @Query() q: Record<string, string>,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "files", "GET", a, undefined, q);
  }
  @Get(":id") get(
    @Res() r: Response,
    @Param("id") id: string,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `files/${id}`, "GET", a);
  }
  @Get(":id/download-url") url(
    @Res() r: Response,
    @Param("id") id: string,
    @Query() q: Record<string, string>,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `files/${id}/download-url`, "GET", a, undefined, q);
  }
  @Delete(":id") remove(
    @Res() r: Response,
    @Param("id") id: string,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `files/${id}`, "DELETE", a);
  }
}

@ApiTags("Notifications")
@ApiBearerAuth()
@Controller({ path: "notifications", version: "1" })
export class NotificationProxyController extends BaseController {
  constructor(p: PlatformProxyService) {
    super(p, "notification");
  }
  @Get() list(@Res() r: Response, @Headers("authorization") a?: string) {
    return this.send(r, "notifications", "GET", a);
  }
  @Get("unread-count") unread(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "notifications/unread-count", "GET", a);
  }
  @Patch(":id/read") read(
    @Res() r: Response,
    @Param("id") id: string,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `notifications/${id}/read`, "PATCH", a, {});
  }
  @Post("read-all") all(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "notifications/read-all", "POST", a, {});
  }
  @Post("send") sendNotice(
    @Res() r: Response,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "notifications/send", "POST", a, b);
  }
}
@ApiTags("Notification Templates")
@ApiBearerAuth()
@Controller({ path: "notification-templates", version: "1" })
export class TemplateProxyController extends BaseController {
  constructor(p: PlatformProxyService) {
    super(p, "notification");
  }
  @Get() list(@Res() r: Response, @Headers("authorization") a?: string) {
    return this.send(r, "notification-templates", "GET", a);
  }
  @Post() create(
    @Res() r: Response,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "notification-templates", "POST", a, b);
  }
  @Patch(":id") update(
    @Res() r: Response,
    @Param("id") id: string,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `notification-templates/${id}`, "PATCH", a, b);
  }
  @Delete(":id") remove(
    @Res() r: Response,
    @Param("id") id: string,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `notification-templates/${id}`, "DELETE", a);
  }
}
@ApiTags("Audit")
@ApiBearerAuth()
@Controller({ path: "audit-logs", version: "1" })
export class AuditProxyController extends BaseController {
  constructor(p: PlatformProxyService) {
    super(p, "audit");
  }
  @Get() list(
    @Res() r: Response,
    @Query() q: Record<string, string>,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "audit-logs", "GET", a, undefined, q);
  }
  @Get(":id") get(
    @Res() r: Response,
    @Param("id") id: string,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `audit-logs/${id}`, "GET", a);
  }
}
@ApiTags("Reports")
@ApiBearerAuth()
@Controller({ path: "reports", version: "1" })
export class ReportProxyController extends BaseController {
  constructor(p: PlatformProxyService) {
    super(p, "report");
  }
  @Get("dashboard") dashboard(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "reports/dashboard", "GET", a);
  }
  @Get("sales") sales(
    @Res() r: Response,
    @Query() q: Record<string, string>,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "reports/sales", "GET", a, undefined, q);
  }
  @Get("orders") orders(
    @Res() r: Response,
    @Query() q: Record<string, string>,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "reports/orders", "GET", a, undefined, q);
  }
  @Get("payments") payments(
    @Res() r: Response,
    @Query() q: Record<string, string>,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "reports/payments", "GET", a, undefined, q);
  }
  @Post("exports") create(
    @Res() r: Response,
    @Body() b: unknown,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "reports/exports", "POST", a, b);
  }
  @Get("exports") exports(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "reports/exports", "GET", a);
  }
  @Get("exports/:id") export(
    @Res() r: Response,
    @Param("id") id: string,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, `reports/exports/${id}`, "GET", a);
  }
  @Post("rebuild") rebuild(
    @Res() r: Response,
    @Headers("authorization") a?: string,
  ) {
    return this.send(r, "reports/rebuild", "POST", a, {});
  }
}
