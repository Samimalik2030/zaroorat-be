import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument, Mongoose, Schema, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';
import { User } from 'src/user/user.mongo';
import { Post } from 'src/posts/posts.mongo';

export type CommentDocument = HydratedDocument<Comment>;

@MongoSchema()
export class Comment {
  @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

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
