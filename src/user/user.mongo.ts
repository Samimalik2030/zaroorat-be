import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Mongoose, ObjectId, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';
import { Role } from './user.dto';

export type UserDocument = HydratedDocument<User>;

@MongoSchema()
export class User {
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

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
