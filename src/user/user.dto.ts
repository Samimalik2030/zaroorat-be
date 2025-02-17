import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.mongo';

export enum Role {
  ADMIN = 'admin',
}

export enum TokenType {
  EMAIL_VERIFICATION = 'Email Verification',
  FORGOT_PASSWORD = 'Forgot Password',
}

export class AuthUserDto {
  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: String })
  accessToken?: string;
}

export class SignInDto {
  @ApiProperty({ default: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
  email: string;

  @ApiProperty({ default: 'Admin@123', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForgotPasswordDTO {
  @ApiProperty({ default: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
  email: string;

  @ApiProperty({ default: TokenType.FORGOT_PASSWORD, required: true })
  @IsNotEmpty()
  @IsString()
  type: TokenType;
}

export class ResetPasswordDTO {
  @ApiProperty({ default: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
  email: string;

  @ApiProperty({ default: 535443 })
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty({ default: 'Admin@123', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ default: 'Admin@123', required: true })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export class VerifyOtpDTO {
  @ApiProperty({ default: 'admin@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({ default: TokenType.FORGOT_PASSWORD, required: true })
  @IsNotEmpty()
  @IsString()
  type: TokenType;

  @ApiProperty({ default: 535443 })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
