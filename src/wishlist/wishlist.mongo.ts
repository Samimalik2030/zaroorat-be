import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BaseSchema } from 'src/common/base.schema';
import { Schema } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { Product } from 'src/products/schema/product.mongo';
import { User } from 'src/user/user.mongo';
import { transformObjectId } from 'src/common/transform-to-obj';

@MongoSchema()
export class Wishlist  {
  @Transform(transformObjectId)
  @Prop({ type: Schema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ type: User })
  user: User;

  @Transform(transformObjectId)
  @Prop({ type: Schema.Types.ObjectId, ref: 'Product', required: true })
  @ApiProperty({ type: Product })
  product: Product;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
