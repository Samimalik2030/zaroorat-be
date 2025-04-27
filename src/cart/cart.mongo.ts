import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BaseSchema } from 'src/common/base.schema';
import { Schema } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { Product } from 'src/products/schema/product.mongo';
import { transformObjectId } from 'src/common/transform-to-obj';

@MongoSchema()
export class Cart extends BaseSchema {
  @ApiProperty()
  @Prop({ required: true })
  quantity: number;

  @ApiProperty()
  @Prop({ required: true })
  color: string;

  @ApiProperty()
  @Prop({ required: true })
  size: string;

  @Transform(transformObjectId)
  @Prop({ type: Schema.Types.ObjectId, ref: 'Product' })
  @ApiProperty({ type: Product })
  product: Product;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
