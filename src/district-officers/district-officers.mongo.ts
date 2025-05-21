import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.mongo'; // Adjust the path as needed
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export type DistrictOfficerDocument = DistrictOfficer & Document;

@MongoSchema()
export class DistrictOfficer {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({ example: '03001234567', description: 'Contact phone number' })
  @Prop({ required: true, trim: true })
  phone: string;

  @ApiProperty({
    example: '35202-1234567-8',
    description: 'Unique CNIC number',
  })
  @Prop({ required: true,  trim: true })
  cnic: string;



  @ApiProperty({
    example: 'male',
    enum: ['male', 'female', 'other'],
    description: 'Gender',
  })
  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender: string;

  @ApiProperty({
    example: '123 Street, Lahore',
    description: 'Residential address',
    required: false,
  })
  @Prop({ trim: true })
  address: string;

  @ApiProperty({
    example: 'Lahore',
    description: 'District name',
    required: false,
  })
  @Prop({ trim: true })
  district: string;


  @ApiProperty({
    example: 'Masters in Public Administration',
    description: 'Highest qualification',
    required: false,
  })
  @Prop({ trim: true })
  qualification: string;

  @ApiProperty({
    example: '5 years in law enforcement',
    description: 'Experience details',
    required: false,
  })
  @Prop({ trim: true })
  experience: string;

  @ApiProperty({
    type: () => User,
    description: 'Reference to the User who owns this',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User | MongooseSchema.Types.ObjectId;
}

export const DistrictOfficerSchema =
  SchemaFactory.createForClass(DistrictOfficer);
