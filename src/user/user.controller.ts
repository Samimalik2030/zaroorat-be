import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  AuthUserDto,
  CreateUserDto,
  ForgotPasswordDTO,
  SignInDto,
  TokenType,
} from './user.dto';
import { User } from './user.mongo';
import { TokenService } from 'src/token/token.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get('get-users')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Post('sign-up')
  @ApiResponse({
    status: 201,
    type: AuthUserDto,
    description: 'User created successfully.',
  })
  async createUser(@Body() body: CreateUserDto): Promise<AuthUserDto> {
    const createdUser = await this.userService.register(body);
    return createdUser;
  }

  @Post('sign-in')
  @ApiResponse({
    status: 201,
    type: AuthUserDto,
    description: 'User signed in successfully.',
  })
  async SignIn(@Body() body: SignInDto): Promise<AuthUserDto> {
    const user = await this.userService.signIn(body);
    return user;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO): Promise<string> {
    const otp = await this.tokenService.generate(body.email, body.type);
    return `Please use this ${otp} to verify.`;
  }

  @Post('verify-otp')
  @ApiResponse({
    status: 201,
    type: AuthUserDto,
    description: 'User signed in successfully.',
  })
  async veriftOTP(@Body() body: SignInDto): Promise<AuthUserDto> {
    const user = await this.userService.signIn(body);
    return user;
  }
}
