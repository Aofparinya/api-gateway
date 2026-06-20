import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { AuthProxyService } from "./auth-proxy.service";
import {
  AssignRolesDto,
  CreateUserDto,
  UpdateUserDto,
} from "./dto/auth-proxy.dto";

abstract class AdminProxyController {
  constructor(protected readonly proxy: AuthProxyService) {}

  protected async send(
    response: Response,
    path: string,
    method: string,
    authorization: string | undefined,
    body?: unknown,
  ): Promise<void> {
    const result = await this.proxy.forward(path, method, body, authorization);
    response.status(result.status);
    if (result.body === undefined) {
      response.send();
      return;
    }
    response.json(result.body);
  }
}

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersProxyController extends AdminProxyController {
  constructor(proxy: AuthProxyService) {
    super(proxy);
  }

  @Post()
  create(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: CreateUserDto,
    @Res() response: Response,
  ) {
    return this.send(response, "users", "POST", authorization, body);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, "users", "GET", authorization);
  }

  @Get(":id")
  get(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, `users/${id}`, "GET", authorization);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: UpdateUserDto,
    @Res() response: Response,
  ) {
    return this.send(response, `users/${id}`, "PATCH", authorization, body);
  }

  @Patch(":id/roles")
  assignRoles(
    @Param("id") id: string,
    @Headers("authorization") authorization: string | undefined,
    @Body() body: AssignRolesDto,
    @Res() response: Response,
  ) {
    return this.send(
      response,
      `users/${id}/roles`,
      "PATCH",
      authorization,
      body,
    );
  }
}

@ApiTags("roles")
@ApiBearerAuth()
@Controller("roles")
export class RolesProxyController extends AdminProxyController {
  constructor(proxy: AuthProxyService) {
    super(proxy);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, "roles", "GET", authorization);
  }
}

@ApiTags("permissions")
@ApiBearerAuth()
@Controller("permissions")
export class PermissionsProxyController extends AdminProxyController {
  constructor(proxy: AuthProxyService) {
    super(proxy);
  }

  @Get()
  list(
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, "permissions", "GET", authorization);
  }
}
