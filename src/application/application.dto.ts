import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  @IsMongoId()
  candidate: string;

  @ApiProperty()
  @IsMongoId()
  job: string;
}

export class UpdateApplicationDto {
  @ApiProperty()
  @IsString()
  status: string;
}


export class ApplicationQueryDto {
  @ApiProperty()
  @IsString()
  status: string;
}


export enum ApplicationStatus {
  FIRST = 'First',
  SECOND = 'Second',
  THIRD = 'Third',
  FOURTH = 'Fourth',
}
