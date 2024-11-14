import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Mongoose, Schema, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';
import { User } from 'src/user/user.mongo';
import { Post } from 'src/posts/posts.mongo';
import { isInstance } from 'class-validator';

export type CommentDocument = HydratedDocument<Comment>;

export default function objectIdToString(obj) {
  if (obj.value instanceof Types.ObjectId) {
    return obj.value.toString();
  }
  return obj.value;
}

@MongoSchema()
export class Comment {
  @Transform(objectIdToString)
  @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Transform(objectIdToString)
  @Prop({ type: Schema.Types.ObjectId, ref: 'Post', required: true })
  postId: Post;

  @Prop()
  comment: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
