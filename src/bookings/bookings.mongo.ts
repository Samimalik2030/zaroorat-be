import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { BookingStatus } from './bookings.dto';
import { Transform } from 'class-transformer';
import { FileDto } from 'src/decorator/file.type';
import { User } from 'src/user/user.mongo';
import { Professional } from 'src/professional/professional.mongo';

export type BookingDocument = Booking & Document;

@MongoSchema({ timestamps: true })
export class Booking {
  @ApiProperty({
    description: 'Unique identifier of the booking',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({
    type: () => User,
    description: 'Reference to the User who owns this',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User | MongooseSchema.Types.ObjectId;

  @ApiProperty({
    type: () => Professional,
    description: 'Reference to the User who owns this',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Professional',
    required: false,
    default:null
  })
  professional: Professional | MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ type: Date, description: 'Date and time of the booking' })
  date: Date;

  @Prop({ required: true })
  @ApiProperty({ type: String, description: 'Date and time of the booking' })
  time: String;

  @Prop({ required: true })
  @ApiProperty({ type: String, description: 'Date and time of the booking' })
  city: String;

  @Prop({
    type: String,
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  @ApiProperty({
    enum: BookingStatus,
    example: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Prop()
  @ApiProperty({
    type: String,
    description: 'Additional notes or instructions from the customer',
    required: false,
  })
  description?: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: 'Address where service is to be provided',
  })
  address?: string;

  @Prop()
  @ApiProperty({
    type: FileDto,
    description: 'Address where service is to be provided',
    isArray: true,
    required: false,
  })
  images?: FileDto[];

  @Prop()
  @ApiProperty({
    type: FileDto,
    description: 'Address where service is to be provided',
    required: false,
  })
  audio?: FileDto;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
