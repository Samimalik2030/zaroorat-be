import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { User } from 'src/user/user.mongo';
import { IFile } from '../types';


@MongoSchema()
export class Review {
  @Prop()
  @ApiProperty()
  comment: string;

 

  


  @Prop({ default: 'null' })
  @ApiProperty()
  deletedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
