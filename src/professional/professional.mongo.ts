import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { Coordinates, Profession } from './professional.dto';
import { Salesman } from 'src/salesman/salesman.mongo';
import { User } from 'src/user/user.mongo';

export type ProfessionalDocument = Professional & Document;

@MongoSchema({ timestamps: true })
export class Professional {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ type: String, example: 'john doe' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ type: String, example: '03001234567' })
  phone: string;

  @Prop({ required: true })
  @ApiProperty({ type: String, example: '03001234567' })
  whatsappNumber: string;

  @Prop({ required: true, enum: Profession })
  @ApiProperty({ enum: Profession, example: Profession.ELECTRICIAN })
  profession: Profession;

  @Prop()
  @ApiProperty({ type: Number, example: 3, required: false })
  experienceYears?: number;

  @Prop({ required: true })
  @ApiProperty({ type: String, example: 'Lahore' })
  city: string;

  @Prop()
  @ApiProperty({ type: String, example: '123 Street, Lahore', required: false })
  address?: string;

  @Prop({
    type: Coordinates,
  })
  @ApiProperty({
    type: Coordinates,
    required: false,
  })
  coordinates?: Coordinates;

  @Prop({ default: false })
  @ApiProperty({ type: Boolean, default: false })
  isVerified: boolean;

  // @ApiProperty({
  //   type: () => User,
  //   description: 'Reference to the User who owns this',
  // })
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  // user: User | MongooseSchema.Types.ObjectId;

  // @ApiProperty({
  //   type: () => Salesman,
  //   description: 'Reference to the User who owns this',
  // })
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  // createdBy: Salesman | MongooseSchema.Types.ObjectId;
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
