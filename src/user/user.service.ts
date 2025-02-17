import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.mongo';
import {
  AuthUserDto,
  ResetPasswordDTO,
  SignInDto,
  VerifyOtpDTO,
} from './user.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async first(data: Partial<User>): Promise<User> {
    return await this.userModel.findOne(data);
  }
  async seedAdmin(body: Partial<User>): Promise<User> {
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
console.log('sami')
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

  async verifyOtp(@Body() body: VerifyOtpDTO): Promise<any> {
    const token = await this.tokenService.find(body.email, body.type);
    if (
      !token ||
      !this.tokenService.verify(body.otp, body.otp) ||
      token.isExpired
    ) {
      throw new BadRequestException('Invalid or expired token');
    }

    return { message: 'OTP Verified Successfully.' };
  }

  async resetPassword(body: ResetPasswordDTO): Promise<User> {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Password does not match');
    }
    const token = await this.tokenService.find(body.email, body.type);
    if (!token || !this.tokenService.verify(body.otp, token.hash)) {
      throw new BadRequestException('Invalid or expired token');
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    user.password = hashedPassword;
    await user.save();
    return user;
  }



  async updateProfile(id:Types.ObjectId,data: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id,data, { returnDocument:"after"});
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
   return user;
  }
}
