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
  

  @ApiProperty({ example: 'Elegant white marble with grey veins.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '60x30 inches' })
  @IsString()
  dimensions: string;

  @ApiProperty({ example: '2 cm' })
  @IsString()
  thickness: string;

  @ApiProperty({ example: 'Polished' })
  @IsString()
  finish: string;

  @ApiProperty({ example: 'White Marble' })
  @IsString()
  category: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({ example: 'White' })
  @IsString()
  color: string;

  @ApiProperty({ example: 'Italy' })
  @IsString()
  origin: string;

  @ApiProperty({ example: ['luxury', 'floor', 'classic'], type: [String] })
  @IsArray()
  tags: string[];

  @ApiProperty({ type: () => ImageDto })
  @ValidateNested()
  @Type(() => ImageDto)
  image: ImageDto;
}
