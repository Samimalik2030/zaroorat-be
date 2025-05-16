import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInquiryDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  query: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  type: string;
}

export class UpdateInquiryDto {
  @ApiProperty()
  message: string;
}
