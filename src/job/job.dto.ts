import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateJobDto {
  @ApiProperty({ example: 'Junior Constable', description: 'Job title' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional({ example: 'Job description here...', description: 'Job description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, description: 'Number of vacancies' })
  @IsInt()
  @Min(1)
  vacancies: number;

  @ApiProperty({ example: 7, description: 'BPS (Basic Pay Scale)' })
  @IsInt()
  @Min(1)
  bps: number;

  @ApiProperty({ example: 'male', enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: 18, description: 'Minimum age requirement' })
  @IsInt()
  @Min(0)
  age_min: number;

  @ApiProperty({ example: 25, description: 'Maximum age requirement' })
  @IsInt()
  @Min(0)
  age_max: number;

  @ApiPropertyOptional({ example: 170, description: 'Minimum height for male in cm' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height_male?: number;

  @ApiPropertyOptional({ example: 158, description: 'Minimum height for female in cm' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height_female?: number;

  @ApiPropertyOptional({ example: '33x34.5', description: 'Chest measurement for male' })
  @IsOptional()
  @IsString()
  chest_male?: string;

  @ApiPropertyOptional({ example: '', description: 'Chest measurement for female' })
  @IsOptional()
  @IsString()
  chest_female?: string;

  @ApiPropertyOptional({ example: 'Matric', description: 'Minimum education requirement' })
  @IsOptional()
  @IsString()
  education?: string;

  @ApiPropertyOptional({ example: '2025-12-31', description: 'Application deadline' })
  @IsOptional()
  @IsDateString()
  application_deadline?: Date;

  @ApiProperty({ example: '2025-05-18', description: 'Posting date' })
  @IsDateString()
  posting_date: Date;

  @ApiProperty({ example: 0, description: 'Application fee amount' })
  @IsInt()
  @Min(0)
  application_fee: number;

  @ApiPropertyOptional({ example: 'Terms and conditions text', description: 'Terms and conditions' })
  @IsOptional()
  @IsString()
  terms_and_conditions?: string;
}


export class UpdateJobDto extends PartialType(CreateJobDto) {}


export class JobQueryDto {
  @ApiPropertyOptional({ example: 'Junior Constable', description: 'Job title' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;
}