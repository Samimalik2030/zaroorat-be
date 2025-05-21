import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateDistrictOfficerDto {
  @ApiProperty({ example: 'Sami', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '03001234567', description: 'Phone number' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '03001234567', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '35202-1234567-8', description: 'CNIC number' })
  @IsString()
  cnic: string;



  @ApiProperty({
    example: 'male',
    enum: ['male', 'female', 'other'],
    description: 'Gender',
  })
  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @ApiProperty({
    example: '123 Street, City',
    description: 'Address',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Lahore', description: 'District', required: false })
  @IsOptional()
  @IsString()
  district?: string;



  @ApiProperty({
    example: 'Masters in Public Administration',
    description: 'Qualification',
    required: false,
  })
  @IsOptional()
  @IsString()
  qualification?: string;

  @ApiProperty({
    example: '5 years experience in law enforcement',
    description: 'Experience',
    required: false,
  })
  @IsOptional()
  @IsString()
  experience?: string;
}

export class UpdateDistrictOfficerDto extends PartialType(
  CreateDistrictOfficerDto,
) {}

export class DistrictOfficerQueryDto {
  @ApiProperty({
    example: '35202-1234567-8',
    description: 'CNIC number',
    required: false,
  })
  @IsOptional()
  @IsString()
  cnic?: string;

  @ApiProperty({
    example: 'Multan',
    description: 'District name',
    required: false,
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({
    example: 'Sami Ullah',
    description: 'Full name of the district officer',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
