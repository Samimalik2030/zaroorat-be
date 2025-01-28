import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  AuthUserDto,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  SignInDto,
  TokenType,
  VerifyOtpDTO,
} from './user.dto';
import { User } from './user.mongo';
import { TokenService } from 'src/token/token.service';
import { JwtGuard } from 'src/guards/Guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}


  
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
  async veriftOTP(@Body() body: VerifyOtpDTO): Promise<string> {
    const verify = await this.userService.verifyOtp(body);
    return verify;
  }

  @Post('reset-password')
  @ApiResponse({
    status: 201,
    type: AuthUserDto,
    description: 'User signed in successfully.',
  })

  async resetPassword(@Body() body: ResetPasswordDTO): Promise<User> {
    const user = await this.userService.resetPassword(body);
    return user;
  }
}
