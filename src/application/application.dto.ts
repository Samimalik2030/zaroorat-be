import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  @IsMongoId()
  candidate: string;

  @ApiProperty()
  @IsMongoId()
  job: string;
}

export class ApplicationQueryDto {
  @ApiProperty()
  @IsString()
  status: string;
}

export enum ApplicationStatus {
  DATA_VERIFICATION = 'Data Verification',
  PHYSICAL_TEST = 'Physical Test',
  RUNNING = 'Running',
  WRITTEN_TEST = 'Written Test',
  INTERVIEW = 'Interview',
  Rejected = 'Rejected',
  SELECTED = 'Selected'
}


export class ApplicationUpdateDto {
  @ApiProperty()
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
