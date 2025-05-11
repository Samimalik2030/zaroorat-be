import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import {
  AuthUserDto,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  SignInDto,
  SignUpDto,
  TokenType,
  VerifyOtpDTO,
} from './user.dto';
import { User } from './user.mongo';
import { TokenService } from 'src/token/token.service';
import { JwtGuard } from 'src/guards/Guard';
import { MailerService } from 'src/mailer/service/mailer.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { MessageDto } from 'src/common/message.dto';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('sign-in')
  @ApiResponse({
    status: 201,
    type: AuthUserDto,
    description: 'User signed in successfully.',
  })
  async SignIn(@Body() body: SignInDto): Promise<AuthUserDto> {
    console.log(body);
    const user = await this.userService.signIn(body);
    return user;
  }

  @Post('sign-up')
  @ApiResponse({
    status: 201,
    type: AuthUserDto,
    description: 'User signed in successfully.',
  })
  async SignUp(@Body() body: SignUpDto): Promise<AuthUserDto> {
    const user = await this.userService.signUp(body);
    return user;
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO): Promise<MessageDto> {
    const user = await this.userService.first({
      email: body.email,
    });
    if(!user){
      throw new NotFoundException(`No linked account found with this email ${body.email}`)
    }
   
    const otp = await this.tokenService.generate(body.email, body.type);
    await this.mailerService.sendMail(
      body.email,
      'Reset Password',
      `Please use this ${otp} to verify.`,
    );
    return {
      message: `Email sent to ${body.email}.Please check your email.`,
    };
  }

  @Post('verify-otp')
  @ApiResponse({
    status: 201,
    type: MessageDto,
  })
  async verifyOTP(@Body() body: VerifyOtpDTO): Promise<MessageDto> {
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

  @Get('auth-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async authUser(@Body() body: SignInDto, @Req() req: Request): Promise<User> {
    return await this.userService.first({ email: req.user.email });
  }

  @Patch('update-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateProfile(
    @Body() body: Partial<User>,
    @Req() req: Request,
  ): Promise<User> {
    return await this.userService.updateProfile(req.user._id, body);
  }
}
