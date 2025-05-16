import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FileDto {
  @ApiProperty({ description: 'Id of the file' })
  id: string;

  @ApiProperty({ description: 'url of the file' })
  url: string;
}

export class DimensionsDto {
  @ApiProperty()
  @IsNumber()
  length: number;

  @ApiProperty()
  @IsNumber()
  width: number;
}
