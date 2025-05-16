import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    example: 'abc123',
    description: 'File ID of the uploaded image',
  })
  @IsOptional()
  @IsString()
  fileId?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'URL of the uploaded image',
  })
  @IsOptional()
  @IsString()
  url?: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Carrara White Marble' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 25,
    description: 'Price per sq.ft or per slab',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsNumber()
  length?: number;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiPropertyOptional({ example: 'Elegant white marble with grey veins.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  thickness?: number;

  @ApiPropertyOptional({ example: 'Polished' })
  @IsOptional()
  @IsString()
  finish?: string;

  @ApiPropertyOptional({ example: 'White Marble' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({ example: ['luxury', 'floor', 'classic'], type: [String] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional({ type: () => ImageDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageDto)
  image?: ImageDto;
}
