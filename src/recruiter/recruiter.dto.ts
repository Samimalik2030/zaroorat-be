import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsMongoId,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateRecruiterDto {
  @ApiProperty({ example: '03001234567', description: 'Phone number' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '03001234567', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '03001234567', description: 'Phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '35202-1234567-8', description: 'CNIC number' })
  @IsString()
  @IsNotEmpty()
  cnic: string;

  @ApiProperty({
    example: 'male',
    description: 'Gender',
    enum: ['male', 'female', 'other'],
  })
  @IsIn(['male', 'female'])
  @IsString()
  gender: string;

  @ApiProperty({
    example: '123 Street, Lahore',
    description: 'Address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'Bachelor’s in Criminology',
    description: 'Qualification',
  })
  @IsString()
  @IsNotEmpty()
  qualification: string;

  @ApiProperty({
    example: 'Lahore',
    description: 'District',
  })
  @IsString()
  @IsNotEmpty()
  district: string;
}

export class UpdateRecruiterDto extends PartialType(CreateRecruiterDto) {}

export class RecruiterQueryDto {
  // @ApiProperty({
  //   example: '35202-1234567-8',
  //   description: 'CNIC number',
  // })
  // @IsString()
  // @IsOptional()
  // cnic?: string;

  // @ApiProperty({
  //   example: '03001234567',
  //   description: 'Phone number',
  // })
  // @IsString()
  // @IsOptional()
  // phone?: string;

  @ApiProperty({
    example: 'Lahore',
    description: 'District',
    required: false,
  })
  @IsString()
  @IsOptional()
  district?: string;
}
