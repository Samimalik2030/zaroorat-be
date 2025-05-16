import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { DimensionsDto, FileDto } from 'src/decorator/file.type';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

@MongoSchema()
export class Product {
  @ApiProperty({ example: 'Carrara White Marble' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 25, description: 'Price per sq.ft or per slab' })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ example: 'Elegant white marble with grey veins.' })
  @Prop()
  description: string;

  @ApiProperty({ type: DimensionsDto })
  @Prop(DimensionsDto)
  dimensions: DimensionsDto;

  @ApiProperty({ example: '2 cm' })
  @Prop()
  thickness: number;

  @ApiProperty({ example: 'Polished' })
  @Prop()
  finish: string;

  @ApiProperty({ example: 'White Marble' })
  @Prop({ required: true })
  category: string;

  @ApiProperty({ type: FileDto })
  @Prop(FileDto)
  image: FileDto;

  @ApiProperty({ example: true })
  @Prop({ default: true })
  inStock: boolean;

  @ApiProperty({ example: ['luxury', 'floor', 'classic'], type: [String] })
  @Prop([String])
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
