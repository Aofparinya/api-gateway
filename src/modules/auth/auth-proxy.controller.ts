import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Res,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AuthProxyService } from "./auth-proxy.service";
import {
  LoginDto,
  LogoutDto,
  RefreshTokenDto,
  RegisterDto,
  ValidateTokenDto,
} from "./dto/auth-proxy.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthProxyController {
  constructor(private readonly proxy: AuthProxyService) {}

  @Post("login")
  login(@Body() body: LoginDto, @Res() response: Response) {
    return this.send(response, "auth/login", "POST", body);
  }

  @Post("register")
  register(@Body() body: RegisterDto, @Res() response: Response) {
    return this.send(response, "auth/register", "POST", body);
  }

  @Post("refresh-token")
  refresh(@Body() body: RefreshTokenDto, @Res() response: Response) {
    return this.send(response, "auth/refresh-token", "POST", body);
  }

  @Post("logout")
  @HttpCode(204)
  logout(@Body() body: LogoutDto, @Res() response: Response) {
    return this.send(response, "auth/logout", "POST", body);
  }

  @Post("validate-token")
  validate(@Body() body: ValidateTokenDto, @Res() response: Response) {
    return this.send(response, "auth/validate-token", "POST", body);
  }

  @Get("me")
  @ApiBearerAuth()
  me(
    @Headers("authorization") authorization: string | undefined,
    @Res() response: Response,
  ) {
    return this.send(response, "auth/me", "GET", undefined, authorization);
  }

  private async send(
    response: Response,
    path: string,
    method: string,
    body?: unknown,
    authorization?: string,
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
