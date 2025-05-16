// create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DimensionsDto } from 'src/decorator/file.type';

class ImageDto {
  @ApiProperty({
    example: 'abc123',
    description: 'File ID of the uploaded image',
  })
  @IsString()
  fileId: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL of the uploaded image',
  })
  @IsString()
  url: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Carrara White Marble' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 25,
    description: 'Price per sq.ft or per slab',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 25,
    description: 'Price per sq.ft or per slab',
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    example: 25,
    description: 'Price per sq.ft or per slab',
  })
  @IsNumber()
  width: number;

  @ApiProperty({ example: 'Elegant white marble with grey veins.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2 cm' })
  @IsNumber()
  thickness: number;

  @ApiProperty({ example: 'Polished' })
  @IsString()
  finish: string;

  @ApiProperty({ example: 'White Marble' })
  @IsString()
  category: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({ example: ['luxury', 'floor', 'classic'], type: [String] })
  @IsArray()
  tags: string[];

  @ApiProperty({ type: () => ImageDto })
  @ValidateNested()
  @Type(() => ImageDto)
  image: ImageDto;
}

export class CalculatorDto {
  @ApiProperty({ example: 'Carrara White Marble' })
  @IsString()
  id: string;

  @ApiProperty({
    example: 25,
    description: 'Price per sq.ft or per slab',
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    example: 25,
    description: 'Price per sq.ft or per slab',
  })
  @IsNumber()
  width: number;
}
