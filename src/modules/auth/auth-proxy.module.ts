import { Module } from "@nestjs/common";
import { AuthProxyController } from "./auth-proxy.controller";
import {
  PermissionsProxyController,
  RolesProxyController,
  UsersProxyController,
} from "./admin-proxy.controller";
import { AuthProxyService } from "./auth-proxy.service";

@Module({
  controllers: [
    AuthProxyController,
    UsersProxyController,
    RolesProxyController,
    PermissionsProxyController,
  ],
  providers: [AuthProxyService],
})
export class AuthProxyModule {}
