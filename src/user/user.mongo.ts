import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';
import { Role } from './user.dto';

export type UserDocument = HydratedDocument<User>;

@MongoSchema()
export class User {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'Username of the user',
    type: String,
    example: 'john_doe',
  })
  @Prop()
  fullName: string;

  @ApiProperty({
    description: 'Email address of the user',
    type: String,
    example: 'john.doe@example.com',
  })
  @Prop()
  email: string;

  @ApiProperty({
    description: 'Password of the user (hidden)',
    type: String,
    example: 'strong_password123',
  })
  @Prop()
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: Role,
    example: Role.ADMIN,
  })
  @Prop({ enum: Role, default: Role.ADMIN })
  role: Role;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    type: Date,
    example: '2023-01-01T00:00:00.000Z',
  })
  @Prop({ type: Date })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    type: Date,
    example: '2023-01-02T00:00:00.000Z',
  })
  @Prop({ type: Date })
  updatedAt: Date;

  @Exclude()
  @ApiProperty({
    description: 'Version key (hidden)',
    type: Number,
    example: 0,
  })
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
