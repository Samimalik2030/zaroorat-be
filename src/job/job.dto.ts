import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export enum JobCategory {
  ELECTRICIAN = 'Electrician',
  PLUMBER = 'Plumber',
  WELDER = 'Welder',
  CARPENTER = 'Carpenter',
  HVAC_TECHNICIAN = 'HVAC Technician',
  MASON = 'Mason',
  HELPER = 'Helper',
  DRIVER = 'Driver',
  OTHER = 'Other',
}

class BenefitsDto {
  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  accommodation?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  food?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  transport?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  medical?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsString()
  other?: string;
}

class ContractDetailsDto {
  @ApiPropertyOptional({ example: 24 })
  @IsOptional()
  @IsNumber()
  durationMonths?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  renewable?: boolean;

  @ApiPropertyOptional({ example: 6 })
  @IsOptional()
  @IsNumber()
  workingDaysPerWeek?: number;

  @ApiPropertyOptional({ example: 8 })
  @IsOptional()
  @IsNumber()
  workingHoursPerDay?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  overtimeAvailable?: boolean;
}

class InterviewDetailsDto {
  @ApiPropertyOptional({ example: '2025-07-01T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    enum: ['In-person', 'Zoom', 'Skype', 'Phone', 'Video Test'],
  })
  @IsOptional()
  @IsString()
  mode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

class ContactDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  agencyName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  whatsapp?: string;
}

class SalaryDto {
  @ApiPropertyOptional({ example: 1200 })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ example: 'AED' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: 'Plus overtime' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateJobPostDto {
  @ApiProperty({ example: 'Electrician for building maintenance' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ enum: JobCategory })
  @IsEnum(JobCategory)
  category: JobCategory;

  @ApiProperty({ example: 'UAE' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: 'Dubai' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Al Futtaim Group' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ example: 'Wiring and electrical maintenance...' })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Install wires,Repair sockets',
  })
  @IsOptional()
  @IsString()
  responsibilities?: string;

  @ApiProperty({
    type: String,
    example: 'Wiring,Tools handling',
  })
  @IsOptional()
  @IsString()
  skillsRequired?: string;

  @ApiProperty({ example: 'Minimum 2 years of experience in electrical work' })
  @IsString()
  experienceRequired: string;

  @ApiPropertyOptional({ example: 'Matric / Diploma' })
  @IsOptional()
  @IsString()
  education?: string;

  @ApiPropertyOptional({ type: () => SalaryDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => SalaryDto)
  salary?: SalaryDto;

  @ApiPropertyOptional({ type: () => BenefitsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => BenefitsDto)
  benefits?: BenefitsDto;

  @ApiPropertyOptional({ type: () => ContractDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ContractDetailsDto)
  contractDetails?: ContractDetailsDto;

  @ApiPropertyOptional({ type: () => InterviewDetailsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => InterviewDetailsDto)
  interviewDetails?: InterviewDetailsDto;
}

export class UpdateJobPostDto extends PartialType(CreateJobPostDto) {
  @ApiPropertyOptional({ type: () => BenefitsDto })
  @ValidateNested()
  @Type(() => BenefitsDto)
  benefits?: BenefitsDto;

  @ApiPropertyOptional({ type: () => ContractDetailsDto })
  @ValidateNested()
  @Type(() => ContractDetailsDto)
  contractDetails?: ContractDetailsDto;

  @ApiPropertyOptional({ type: () => InterviewDetailsDto })
  @ValidateNested()
  @Type(() => InterviewDetailsDto)
  interviewDetails?: InterviewDetailsDto;

  @ApiPropertyOptional({ type: () => ContactDto })
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto;

  @ApiPropertyOptional({ type: () => SalaryDto })
  @ValidateNested()
  @Type(() => SalaryDto)
  salary?: SalaryDto;

  @ApiProperty({type:Boolean})
  @IsBoolean()
  isActive:boolean
}

export class JobQueryDto {
  @ApiPropertyOptional({
    example: 'Junior Constable',
    description: 'Job title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Junior Constable',
    description: 'Job title',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    example: 'Junior Constable',
    description: 'Job title',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Job title',
  })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
