import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export type InquiryDocument = HydratedDocument<Inquiry>;

@MongoSchema()
export class Inquiry{
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @Prop()
  @ApiProperty()
  username: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  query: string;


  @Prop({ type: Date })
  @ApiProperty()
  createdAt: Date;

  @Prop({ type: Date })
  @ApiProperty()
  updatedAt: Date;


  @Exclude()
  __v: number;
}

export const InquirySchema = SchemaFactory.createForClass(Inquiry);
