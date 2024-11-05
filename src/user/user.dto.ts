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

  @ApiProperty({ enum: Role, default: Role.BRANCH_MANAGER })
  @IsEnum(Role, {
    message:
      'Role must be either harvesting_manager,farm_warehouse_manager,city_warehouse_manager or branch_manager',
  })
  role: Role;
}

export class SignInDto {
  @ApiProperty({ default: 'admin@email.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform((o) => o.value.toLowerCase().trim())
  email: string;

  @ApiProperty({ default: 'password', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
