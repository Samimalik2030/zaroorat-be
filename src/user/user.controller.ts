import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAdminGuard } from 'src/guards/jwtAdminGuard';
import { AuthUserDto, CreateUserDto, SignInDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post('sign-in')
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
