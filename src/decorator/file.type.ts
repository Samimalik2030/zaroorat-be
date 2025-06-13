import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { FileType } from 'imagekit/dist/libs/interfaces';

export class FileDto {
  @ApiProperty({ description: 'Id of the file' })
  @IsString()
  fileId: string;

  @ApiProperty({ description: 'url of the file' })
  @IsString()
  url: string;
}
