import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { FileDto } from 'src/decorator/file.type';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export type ReviewDocument = HydratedDocument<Review>;

@MongoSchema()
export class Review {
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @Prop()
  @ApiProperty({ description: 'Name of the User' })
  name: string;

  
  @Prop()
  @ApiProperty({ description: 'Your email' })
  email: string;

  @Prop()
  @ApiProperty({ description: 'Comment' })
  comment: string;

  @Exclude()
  __v: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
