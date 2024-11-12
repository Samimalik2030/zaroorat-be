import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument, Mongoose, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';
import { Role } from './user.dto';

export type UserDocument = HydratedDocument<User>;

@MongoSchema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ enum: Role, default: Role.BRANCH_MANAGER })
  role: Role;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({
    default: false,
  })
  isEmailVerified: boolean;

  @Exclude()
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
