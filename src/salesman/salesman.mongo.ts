import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.mongo';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { CityOfficer } from 'src/city-officers/city-officers.mongo';

export type SalesmanDocument = Salesman & Document;

@MongoSchema({ timestamps: true })
export class Salesman {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({
    example: '03001234567',
    description: 'Phone number of the recruiter',
  })
  @Prop({ required: true, trim: true })
  phone: string;

  @ApiProperty({
    example: 'male',
    enum: ['male', 'female'],
    description: 'Gender',
  })
  @Prop({ required: true, enum: ['male', 'female'] })
  gender: string;

  @ApiProperty({
    example: 'Lahore',
    description: 'city assigned to the salesman',
    required: false,
  })
  @Prop()
  city: string;

  // @ApiProperty({
  //   type: () => User,
  //   description: 'Reference to the associated city officer account',
  // })
  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: 'CityOfficer',
  //   required: true,
  // })
  // assignedBy: MongooseSchema.Types.ObjectId | CityOfficer;

  @ApiProperty({
    type: () => User,
    description: 'Reference to the associated user account',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId | User;
}

export const SalesmanSchema = SchemaFactory.createForClass(Salesman);
