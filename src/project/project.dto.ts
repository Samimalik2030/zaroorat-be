import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ImageDto {
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

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  materials: string[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({ type: () => ImageDto })
  @ValidateNested()
  @Type(() => ImageDto)
  image: ImageDto;
}

export class UpdateProjectDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  author: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  materials: string[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({ type: () => ImageDto })
  @ValidateNested()
  @Type(() => ImageDto)
  image: ImageDto;
}


