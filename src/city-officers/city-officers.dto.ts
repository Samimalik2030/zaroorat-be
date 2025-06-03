import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';


export enum City {
  Multan = 'Multan',
  Lahore = 'Lahore',
  Karachi = 'Karachi',
  Islamabad = 'Islamabad',
  Faisalabad = 'Faisalabad',
  Rawalpindi = 'Rawalpindi',
}


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
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({ example: 'Lahore', description: 'District', required: true })
  @IsNotEmpty()
  @IsEnum(City)
  city: City;
}

export class UpdateDistrictOfficerDto extends PartialType(
  CreateDistrictOfficerDto,
) {}

export class DistrictOfficerQueryDto {
 

  @ApiProperty({
    example: 'Multan',
    description: 'District name',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'Sami Ullah',
    description: 'Full name of the district officer',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
