import { Module } from "@nestjs/common";
import {
  AuditProxyController,
  CommonProxyController,
  NotificationProxyController,
  ReportProxyController,
  StorageProxyController,
  TemplateProxyController,
} from "./platform-proxy.controller";
import { PlatformProxyService } from "./platform-proxy.service";
@Module({
  controllers: [
    CommonProxyController,
    StorageProxyController,
    NotificationProxyController,
    TemplateProxyController,
    AuditProxyController,
    ReportProxyController,
  ],
  providers: [PlatformProxyService],
})
export class PlatformProxyModule {}
