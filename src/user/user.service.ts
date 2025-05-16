import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.mongo';
import {
  AuthUserDto,
  ResetPasswordDTO,
  Role,
  SignInDto,
  SignUpDto,
  TokenType,
  VerifyOtpDTO,
} from './user.dto';
import { TokenService } from 'src/token/token.service';
import { MessageDto } from 'src/common/message.dto';

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

  async findById(id: string) {
    return await this.userModel.findById(id);
  }
  async seedAdmin(body: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return await this.userModel.create({
      ...body,
      password: hashedPassword,
    });
  }

  async signUp(data: SignUpDto): Promise<AuthUserDto> {
    const user = await this.userModel.findOne({ email: data.email });
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createdUser = await this.userModel.create({
      ...data,
      password: hashedPassword,
      role: Role.CUSTOMER,
    });

    const accessToken = await this.jwtService.signAsync({
      sub: createdUser._id,
      email: createdUser.email,
      name: createdUser.fullName,
    });

    return {
      user: createdUser,

      accessToken,
    };
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
      name: user.fullName,
    });

    return {
      user,
      accessToken,
    };
  }

  async verifyOtp(@Body() body: VerifyOtpDTO): Promise<MessageDto> {
    const token = await this.tokenService.find(body.email, body.type);
    console.log(token, 'found token');
    if (!token) {
      throw new BadRequestException('Invalid or expired token');
    }

    const verifiedToken = await this.tokenService.verify(body.otp, token.hash);
    if (!verifiedToken || token.isExpired) {
      throw new BadRequestException('Invalid OTP');
    }
    return { message: 'OTP Verified Successfully.' };
  }

  async resetPassword(body: ResetPasswordDTO): Promise<User> {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const verifiedToken = await this.verifyOtp({
      otp: body.otp,
      email: body.email,
      type: TokenType.FORGOT_PASSWORD,
    });
    if (verifiedToken) {
      await this.tokenService.findByEmailAndDelete(
        body.email,
        TokenType.FORGOT_PASSWORD,
      );
    }
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Password does not match');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email: body.email },
      { password: hashedPassword },
      { returnDocument: 'after' },
    );
    return updatedUser;
  }

  async updateProfile(id: any, data: Partial<User>): Promise<any> {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.userModel.findByIdAndUpdate(
        id,
        {
          ...data,
          password: hashedPassword,
        },
        {
          returnDocument: 'after',
        },
      );
      return {
        message: 'Profile Updated',
        user,
      };
    }
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        data,
      },
      {
        returnDocument: 'after',
      },
    );
    return {
      message: 'Profile Updated',
      user,
    };

  }
}
