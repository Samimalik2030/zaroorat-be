import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';
import { isSet } from 'util/types';

export enum Profession {
  PLUMBER = 'Plumber',
  ELECTRICIAN = 'Electrician',
  MECHANIC = 'Mechanic',
  CARPENTER = 'Carpenter',
  AC_TECHNICIAN = 'AC Technician',
  PAINTER = 'Painter',
  CLEANER = 'Cleaner',
}

export class Coordinates {
  @ApiProperty({ example: 31.5204 })
  latitude: number;

  @ApiProperty({ example: 74.3587 })
  longitude: number;
}

export class CreateProfessionalDto {
  @ApiProperty({ example: 'Ali Raza' })
  @IsString()
  name: string;

  // @ApiProperty({ example: 'sami@gmail.com' })
  // @IsString()
  // email: string;

  @ApiProperty({ example: '03001234567' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '03001234567' })
  @IsString()
  whatsappNumber: string;

  @ApiProperty({
    example: Profession.ELECTRICIAN,
    description: 'Profession of the individual',
    enum: Profession,
  })
  @IsEnum(Profession)
  profession: Profession;

  @ApiProperty({
    example: 5,
    required: false,
    description: 'Years of experience (optional)',
  })
  @IsNumber()
  experienceYears?: number;

  @ApiProperty({ example: 'Lahore' })
  @IsString()
  city: string;

  @ApiProperty({ example: '123 Main Street, Lahore', required: false })
  @IsString()
  address: string;

  @ApiProperty({ example: 31.5204 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 74.3587 })
  @IsNumber()
  longitude: number;
}

export class ProfessionalQueryDto {
  @ApiProperty({ example: 'Lahore', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'ELECTRICIAN',
    description: 'Profession of the individual',
    required: false,
  })
  @IsOptional()
  @IsString()
  profession?: string;

  @ApiProperty({ example: '123 Main Street, Lahore', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
