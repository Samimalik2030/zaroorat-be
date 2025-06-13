export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '2025-07-01T10:00:00Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '2025-07-01T12:00:00Z' })
  @IsString()
  time: string;

  @ApiProperty({ example: 'Please be on time.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Please be on time.' })
  @IsString()
  contact: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  address: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Optional voice recording file',
  })
  @IsOptional()
  audio?: any;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
    description: 'Optional images',
  })
  @IsOptional()
  images?: any[];
}

export class BookingQueryDTO {
  @ApiProperty({ example: '2025-07-01T10:00:00Z', required: false })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ example: '2025-07-01T10:00:00Z', required: false })
  @IsString()
  @IsOptional()
  status: string;
}


export class PatchProfessionalDTO {
  @ApiProperty({ example: '2025-07-01T10:00:00Z',required:true })
  @IsString()
  professionalId: string;
}