// update-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'Carrara White Marble' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 25, description: 'Price per sq.ft or per slab' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 'Elegant white marble with grey veins.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '60x30 inches' })
  @IsOptional()
  @IsString()
  dimensions?: string;

  @ApiProperty({ example: '2 cm' })
  @IsOptional()
  @IsString()
  thickness?: string;

  @ApiProperty({ example: 'Polished' })
  @IsOptional()
  @IsString()
  finish?: string;

  @ApiProperty({ example: 'White Marble' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], type: [String] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiProperty({ example: 'White' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: 'Italy' })
  @IsOptional()
  @IsString()
  origin?: string;

  @ApiProperty({ example: ['luxury', 'floor', 'classic'], type: [String] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ example: 'Marble Masters Co.' })
  @IsOptional()
  @IsString()
  supplier?: string;
}
