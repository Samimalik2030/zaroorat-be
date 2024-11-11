import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';

export type PostDocument = HydratedDocument<Post>;

@MongoSchema()
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop()
  url: string;

  @Prop({ type: [Types.ObjectId], ref: 'Comment', default: [] })
  comments: Types.ObjectId[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
