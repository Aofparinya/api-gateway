export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto extends LoginDto {
    firstName: string;
    lastName: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class LogoutDto extends RefreshTokenDto {
}
export declare class ValidateTokenDto {
    token: string;
}
export declare class ServiceTokenDto {
    clientId: string;
    clientSecret: string;
}
export declare class CreateUserDto extends RegisterDto {
    roleCodes: string[];
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    isActive?: boolean;
}
export declare class AssignRolesDto {
    roleCodes: string[];
}
export {};
