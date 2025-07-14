import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Patch,
  NotFoundException,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageKitService } from 'src/image-kit/image-kit.service';
import { AdminAnalyticsDto } from 'src/admin.dto';
import { AppService } from 'src/app.service';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService,
    private readonly imageKitService: ImageKitService,
    private readonly appService: AppService,
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
    console.log(user, 'user in sign in');
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
    if (!user) {
      throw new NotFoundException(
        `No linked account found with this email ${body.email}`,
      );
    }

    const otp = await this.tokenService.generate(body.email, body.type);
    await this.mailerService.sendMail(
      user.email,
      'Reset Password',
      user.fullName,
      `Your OTP is ${otp}`,
    );
    return {
      message: `A reset password email with the OTP has been sent to ${user.email}. Please check your inbox (and spam folder) to proceed.`,
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

  @Get('/stats')
  @ApiOperation({
    summary: 'Get admin analytics stats',
    description:
      'Fetches overall statistics such as total professionals, customers, bookings, job applications, and user activity.',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin analytics data retrieved successfully.',
    type: AdminAnalyticsDto,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getStats(): Promise<AdminAnalyticsDto> {
    return this.appService.getAnalytics();
  }

  @Patch('update-profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Promise<User> {
    return this.userService.updateProfile(id, body);
  }

  @Patch('/:id/upload-profile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploaded = await this.imageKitService.uploadImage(file);
    const updatedUser = await this.userService.updateProfile(id, {
      profileImage: {
        fileId: uploaded.fileId,
        url: uploaded.url,
      },
    });
    return updatedUser;
  }

  // @Post('upload-profile')
  // @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  // async uploadProfileImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Req() req: Request,
  // ) {
  //   const userId = req.user._id;
  //   console.log(file);
  //   const uploaded = await this.imageKitService.uploadImage(file);
  //   const user = await this.userService.updateProfile(userId, {
  //     profileImage: uploaded,
  //   });
  //   return user;
  // }
}
