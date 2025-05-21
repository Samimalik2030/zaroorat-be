import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { FileType } from 'imagekit/dist/libs/interfaces';

export class FileDto {
  @ApiProperty({ description: 'Id of the file' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'url of the file' })
  @IsString()
  url: string;

  @ApiProperty({ description: 'path of the file' })
  @IsString()
  filePath: string;

  @ApiProperty({ description: 'name of the file' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'type of the file' })
  fileType: FileType;
}
