import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.mongo';

export enum Role {
  ADMIN = 'admin',
  HARVESTING_MANAGER = 'harvesting_manager',
  FARM_WAREHOUSE_MANAGER = 'farm_warehouse_manager',
  CITY_WAREHOUSE_MANAGER = 'city_warehouse_manager',
  BRANCH_MANAGER = 'branch_manager',
}

export enum TokenType {
  EMAIL_VERIFICATION = 'Email Verification',
  FORGOT_PASSWORD = 'Forgot Password',
}

export class AuthUserDto {
  user: User;
  accessToken?: string;
}

export class CreateUserDto {
  @ApiProperty({ default: 'sami ullah', required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ default: 'password', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ default: 'sami@email.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
  email: string;
}

export class SignInDto {
  @ApiProperty({ default: 'sami@email.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
  email: string;

  @ApiProperty({ default: 'password', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForgotPasswordDTO {
  @ApiProperty({ default: 'sami@email.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
  email: string;

  @ApiProperty({ default: TokenType.FORGOT_PASSWORD, required: true })
  @IsNotEmpty()
  @IsString()
  type: TokenType;
}

export class VerifyOtpDTO {
  @ApiProperty({ default: 'sami@email.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
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
