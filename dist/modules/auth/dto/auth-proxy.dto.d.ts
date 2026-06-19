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
