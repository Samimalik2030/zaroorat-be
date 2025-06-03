import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { BookingStatus } from './bookings.dto';
import { Transform } from 'class-transformer';

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

  @Prop({ type: Types.ObjectId, required: true, ref: 'Customer' })
  @ApiProperty({ type: String, description: 'ID of the customer who booked' })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Professional' })
  @ApiProperty({ type: String, description: 'ID of the professional assigned' })
  professional: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ type: Date, description: 'Date and time of the booking' })
  bookingDateTime: Date;

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
  notes?: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: 'Address where service is to be provided',
  })
  serviceAddress?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
