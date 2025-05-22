import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/user/user.mongo';
import { Transform } from 'stream';
import { Address } from './schema/adressSchema';
import { Documents } from './schema/document.schema';
import { Education } from './schema/eduaction.schema';
import { Contact } from './schema/emerency-contact.schema';
import { PhysicalInfo } from './schema/physical.info.schema';

export class CreatePersonalInfoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
  })
  father_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
  })
  district: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
  })
  cnic: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
  })
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
  })
  marital_status?: string;

  @IsString()
  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
  })
  @IsOptional()
  religion?: string;
}

export class UpdateCandidateDto {
  @ApiProperty({
    example: 'Rashid Khan',
    description: "Father's name of the candidate",
    required: false,
  })
  @IsOptional()
  father_name: string;

  @ApiProperty({
    example: '35202-1234567-1',
    description: 'CNIC of the candidate',
    required: false,
  })
  @IsOptional()
  cnic: string;

  @ApiProperty({
    example: '2001-06-15',
    description: 'Date of birth',
    required: false,
  })
  @IsOptional()
  dob: Date;

  @ApiProperty({
    example: 'Male',
    description: 'Gender of the candidate',
    required: false,
  })
  @IsOptional()
  gender: string;

  @ApiProperty({
    example: 'Single',
    description: 'Marital status',
    required: false,
  })
  @IsOptional()
  marital_status: string;

  @ApiProperty({
    example: 'Islam',
    description: 'Religion of the candidate',
    required: false,
  })
  @IsOptional()
  religion: string;

  @ApiProperty({
    example: 'Islam',
    description: 'Religion of the candidate',
    required: false,
  })
  @IsOptional()
  district: string;

  @ApiProperty({ type: Address, required: false })
  @Type(() => Address)
  @IsOptional()
  address: Address;

  @ApiProperty({ type: Contact, required: false })
  @Type(() => Contact)
  @IsOptional()
  contact: Contact;

  @ApiProperty({ type: Education, required: false })
  @Type(() => Education)
  @IsOptional()
  education: Education;

  @ApiProperty({ type: PhysicalInfo, required: false })
  @Type(() => PhysicalInfo)
  @IsOptional()
  physical_info: PhysicalInfo;

  @ApiProperty({ type: Documents, required: false })
  @Type(() => Documents)
  @IsOptional()
  documents: Documents;
}
