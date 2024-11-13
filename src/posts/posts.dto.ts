import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDTO {
  @ApiProperty({ description: 'URL of the image' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'ID of the user who created the post' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'List of comment IDs' })
  @IsOptional()
  @IsArray()
  comments: string[];

  @ApiProperty({ description: 'Creation date of the post' })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the post' })
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({ description: 'Mongoose document version key' })
  @IsOptional()
  __v: number;
}
