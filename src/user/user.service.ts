import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.mongo';
import {
  AuthUserDto,
  CreateUserDto,
  ResetPasswordDTO,
  Role,
  SignInDto,
  SignUpDto,
  TokenType,
  VerifyOtpDTO,
} from './user.dto';
import { TokenService } from 'src/token/token.service';
import { MessageDto } from 'src/common/message.dto';
import { MailerService } from 'src/mailer/service/mailer.service';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly mailerService: MailerService,
  ) {}

  async first(data: Partial<User>): Promise<User> {
    return await this.userModel.findOne(data);
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }
  async filter(filter: any) {
    console.log(filter, 'filter');
    const users = await this.userModel.find(filter);
    console.log(users, 'users');
    return users;
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
    console.log(user, 'user found');
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (
      user.role === Role.ADMIN ||
      user.role === Role.CITY_MANAGER ||
      user.role === Role.SALESMAN
    ) {
      await this.mailerService.sendMail(
        user.email,
        'Login Alert',
        user.fullName,
        'You have successfully logged in to your account.If you did not log in, please contact us.',
      );
    }
    const accessToken = await this.jwtService.signAsync({
      sub: user._id,
      email: user.email,
      name: user.fullName,
      role: user.role,
    });
    return { user: user, accessToken: accessToken };
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
        ...data,
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

  // async createUser(data: CreateUserDto) {
  //   const createdUser = await this.userModel.create({
  //     fullName: data.name,
  //     email: data.email,
  //     role: data.role,
  //   });
  //   await this.mailerService.sendMail(
  //     createdUser.email,
  //     'Your District Officer Account Has Been Created',
  //     createdUser.fullName,
  //     'We are pleased to inform you that your account has been successfully created for the District Officer portal.Please set your password to activate your account and begin using the system.',
  //   );
  // }

  async createUser(data: CreateUserDto) {
    try {
      const password = crypto.randomBytes(8).toString('hex');
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await this.userModel.create({
        fullName: data.name,
        email: data.email,
        role: data.role,
        password: hashedPassword,
      });

      await this.mailerService.sendMail(
        createdUser.email,
        `Your ${data.roleType} Account Has Been Created`,
        createdUser.fullName,
        `Dear ${createdUser.fullName},

We are pleased to inform you that your account has been successfully created for the ${data.roleType} portal.

Please use this email ${createdUser.email} and password ${password} to begin using the system.`,
      );

      return createdUser;
    } catch (error) {
      if (data.email) {
        await this.userModel.deleteOne({ email: data.email });
      }
      throw new Error('Failed to create user and send email');
    }
  }

  async patchCoordinates(id: any, longitude: any, latitude: any) {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        address: {
          latitude: latitude,
          longitude: longitude,
        },
      },
      {
        returnDocument: 'after',
      },
    );
  }
  async delete(id: any) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    console.log(deleted);
    return deleted;
  }
}
