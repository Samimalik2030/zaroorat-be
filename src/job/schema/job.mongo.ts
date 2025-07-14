import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { JobCategory } from '../job.dto';
import { Benefits } from './benefits.schema';
import { ContractDetails } from './contract-details.mongo';
import { Salary } from './salary.schema';
import { Interview } from './interview.mongo';

export type JobDocument = Job & Document;

@MongoSchema()
export class Job {
  @ApiProperty({
    description: 'Unique identifier for the job post',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Electrician for Building Maintenance' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ enum: JobCategory, example: 'Electrician' })
  @Prop({ required: true, enum: JobCategory })
  category: JobCategory;

  @ApiProperty({ example: 'UAE' })
  @Prop({ required: true })
  country: string;

  @ApiPropertyOptional({ example: 'Dubai' })
  @Prop()
  city?: string;

  @ApiPropertyOptional({ example: 'Al Futtaim Group' })
  @Prop()
  companyName?: string;

  @ApiProperty({
    example: 'Responsible for installing and repairing wiring...',
  })
  @Prop({ required: true })
  description: string;

  @ApiPropertyOptional({ type: String, example: 'Wiring,Inspection' })
  @Prop(String)
  responsibilities?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Electrical tools,Safety knowledge',
  })
  @Prop(String)
  skillsRequired?: string;

  @ApiProperty({ example: '2 years minimum experience required' })
  @Prop({ required: true })
  experienceRequired: string;

  @ApiPropertyOptional({ example: 'Matric / Technical Diploma' })
  @Prop()
  education?: string;

  @ApiPropertyOptional({ type: () => Salary })
  @Prop({ type: () => Salary })
  salary?: Salary;

  @ApiPropertyOptional({ type: () => Benefits })
  @Prop({ type: () => Benefits, default: {} })
  benefits?: Benefits;

  @ApiPropertyOptional({ type: () => ContractDetails })
  @Prop({ type: () => ContractDetails, default: {} })
  contractDetails?: ContractDetails;

  @ApiPropertyOptional({ type: () => Interview })
  @Prop({ type: () => Interview })
  interviewDetails?: Interview;

  @ApiProperty({ example: true })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ example: '2025-06-25T09:00:00.000Z' })
  @Prop({ default: () => new Date() })
  createdAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
