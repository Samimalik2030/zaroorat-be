import {
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
import { AuthUserDto, CreateUserDto, SignInDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async seedAdmin() {
    const admin = await this.userModel.findOne({ role: 'admin' });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('password', 10);
      const newAdmin = new this.userModel({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        email: 'admin@email.com',
      });

      await newAdmin.save();

      return newAdmin;
    } else {
      throw new ConflictException('Admin already exists');
    }
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: body.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
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
      name: user.username,
      email: user.email,
      role: user.role,
    });

    return {
      user,
      accessToken,
    };
  }

  async findUser(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }
}
