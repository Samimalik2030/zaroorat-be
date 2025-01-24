import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.mongo';
import {
  AuthUserDto,
  CreateUserDto,
  SignInDto,
  UserDto,
  VerifyOtpDTO,
} from './user.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly otpService: TokenService,
  ) {}


   async first(data:Partial<User>):Promise<User>{
    return await this.userModel.findOne(data);
   }
  async seedAdmin(body:Partial<User>):Promise<User> {  
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return await this.userModel.create({
      ...body,
      password: hashedPassword,
    });

 
  }

  async signIn(body: SignInDto): Promise<AuthUserDto> {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user._id,
      email: user.email,
      name: user.username,
    });

    return {
      user,
      accessToken,
    };
  }

  async verifyOtp(body: VerifyOtpDTO): Promise<any> {
    const otpObject = await this.otpService.find(body.email, body.type);
    const isMatched = await this.otpService.verify(otpObject.hash, body.otp);
    if (!isMatched) {
      throw new BadRequestException('Invalid or expired token');
    }
    return {
      message: 'Email verified',
    };
  }

  // async virifyOtp(@Body() body: VerifyOtpDto): Promise<MessageDto | TokenDto> {
  //   const token = await this.tokenService.findOneBy(body.email, body.type);
  //   if (
  //     !token ||
  //     !this.tokenService.verify(token, body.otp) ||
  //     token.isExpired
  //   ) {
  //     throw new BadRequestException('Invalid or expired token');
  //   }

  //   return { message: 'OTP Verified Successfully.' };
  // }
}
