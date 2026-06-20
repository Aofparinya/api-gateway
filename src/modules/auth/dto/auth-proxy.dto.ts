import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "admin@order-platform.local" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "ChangeMe123!" })
  @IsString()
  @MinLength(8)
  password!: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({ example: "Somchai" })
  @IsString()
  firstName!: string;

  @ApiProperty({ example: "Jaidee" })
  @IsString()
  lastName!: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: "Refresh token returned from login or refresh-token",
  })
  @IsString()
  refreshToken!: string;
}

export class LogoutDto extends RefreshTokenDto {}

export class ValidateTokenDto {
  @ApiProperty({
    description: "Access token to validate",
  })
  @IsString()
  token!: string;
}

export class CreateUserDto extends RegisterDto {
  @ApiProperty({ type: [String], example: ["USER"] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roleCodes!: string[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class AssignRolesDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roleCodes!: string[];
}
