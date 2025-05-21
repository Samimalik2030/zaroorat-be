import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import { Address } from './adressSchema';
import { Documents } from './document.schema';
import { Education } from './eduaction.schema';
import { Contact } from './emerency-contact.schema';
import { PhysicalInfo } from './physical.info.schema';
import { Types } from 'mongoose';
import { User } from 'src/user/user.mongo';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { transformObjectId } from 'src/common/transform-to-obj';

@MongoSchema()
export class Candidate {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
  })
  @Prop({ required: true })
  father_name: string;

  @ApiProperty({
    example: '35202-1234567-1',
    description: 'CNIC of the candidate',
  })
  @Prop({ required: true })
  cnic: string;

  @ApiProperty({ example: '2001-06-15', description: 'Date of birth' })
  @Prop({ required: true })
  dob: Date;

  @ApiProperty({ example: 'Male', description: 'Gender of the candidate' })
  @Prop({ required: true })
  gender: string;

  @ApiProperty({ example: 'Single', description: 'Marital status' })
  @Prop()
  marital_status: string;

  @ApiProperty({ example: 'Islam', description: 'Religion of the candidate' })
  @Prop()
  religion: string;

  @ApiProperty({ type: Address })
  @Type(() => Address)
  @Prop({ type: Address, default: null })
  address: Address;

  @ApiProperty({ type: Contact })
  @Type(() => Contact)
  @Prop({ type: Contact, default: null })
  contact: Contact;

  @ApiProperty({ type: Education })
  @Type(() => Education)
  @Prop({ type: Education, default: null })
  education: Education;

  @ApiProperty({ type: PhysicalInfo })
  @Type(() => PhysicalInfo)
  @Prop({ type: PhysicalInfo, default: null })
  physical_info: PhysicalInfo;

  @ApiProperty({ type: Documents, default: null })
  @Type(() => Documents)
  @Prop({ type: Documents, default: null })
  documents: Documents;

  @ApiProperty({
    type: () => User,
    description: 'Reference to the associated user account',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId | User;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
