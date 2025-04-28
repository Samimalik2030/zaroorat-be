import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BaseSchema } from 'src/common/base.schema';
import { Schema } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { Product } from 'src/products/schema/product.mongo';
import { transformObjectId } from 'src/common/transform-to-obj';
import { User } from 'src/user/user.mongo';

@MongoSchema()
export class Cart{
  @Transform(transformObjectId)
  @Prop({ type: Schema.Types.ObjectId, ref: 'User' })
  @ApiProperty({ type: User })
  user: User;

  @Transform(transformObjectId)
  @Prop({ type: Schema.Types.ObjectId, ref: 'Product' })
  @ApiProperty({ type: Product })
  product: Product;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, default: 1 })
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
