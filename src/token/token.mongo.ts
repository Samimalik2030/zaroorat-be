import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { MongoSchema } from '../decorator/mongo-schema.decorator';
import { TokenType } from 'src/user/user.dto';

export type TokenDocument = HydratedDocument<Token>;

@MongoSchema()
export class Token {
  @Prop()
  hash: string;

  @Prop()
  email: string;

  @Prop()
  type: TokenType;

  @Prop()
  expiry: Date;

  @Expose()
  get isExpired(): boolean {
    return Date.now() > this.expiry.getTime();
  }
  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export const tokenSchema = SchemaFactory.createForClass(Token);
