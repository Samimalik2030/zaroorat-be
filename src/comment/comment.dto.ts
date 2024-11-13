import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createCommentDto {
  @ApiProperty()
  @IsString()
  postId: string;

  @ApiProperty()
  @IsString()
  comment: string;
}
