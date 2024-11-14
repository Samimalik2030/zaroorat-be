import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';
import { User } from 'src/user/user.mongo';
import objectIdToString, { Comment } from 'src/comment/comment.mongo';
import { Schema } from 'mongoose';
export type PostDocument = HydratedDocument<Post>;

@MongoSchema()
export class Post {
  @Transform(objectIdToString)
  @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop()
  url: string;

  @Prop()
  imageId: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
