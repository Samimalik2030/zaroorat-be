import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export type JobDocument = Job & Document;

@MongoSchema()
export class Job {

    @ApiProperty({
      description: 'Unique identifier of the user',
      type: String,
      example: '60f7a1c5e5b3a72b3c8a830f',
    })
    @Transform((obj) => obj.value.toString())
    _id: Types.ObjectId;

  @ApiProperty({ example: 'Junior Constable', description: 'Job title' })
  @Prop({ required: true })
  title: string;

  @ApiPropertyOptional({ example: 'Job description here...', description: 'Job description' })
  @Prop()
  description?: string;

  @ApiProperty({ example: 1, description: 'Number of vacancies' })
  @Prop({ default: 1 })
  vacancies: number;

  @ApiProperty({ example: 7, description: 'BPS (Basic Pay Scale)' })
  @Prop({ required: true })
  bps: number;

  @ApiProperty({ example: "Male"})
  @Prop({ type: String })
  gender: string;

  @ApiProperty({ example: 18, description: 'Minimum age requirement' })
  @Prop({ default: 18 })
  age_min: number;

  @ApiProperty({ example: 25, description: 'Maximum age requirement' })
  @Prop({ default: 25 })
  age_max: number;

  @ApiPropertyOptional({ example: 170, description: 'Minimum height for male in cm' })
  @Prop()
  height_male?: number;

  @ApiPropertyOptional({ example: 158, description: 'Minimum height for female in cm' })
  @Prop()
  height_female?: number;

  @ApiPropertyOptional({ example: '33x34.5', description: 'Chest measurement for male' })
  @Prop()
  chest_male?: string;

  @ApiPropertyOptional({ example: '', description: 'Chest measurement for female' })
  @Prop()
  chest_female?: string;

  @ApiPropertyOptional({ example: 'Matric', description: 'Minimum education requirement' })
  @Prop()
  education?: string;

  @ApiPropertyOptional({ example: '2025-12-31', description: 'Application deadline' })
  @Prop()
  application_deadline?: Date;

  @ApiProperty({ example: '2025-05-18', description: 'Posting date' })
  @Prop({ default: () => new Date() })
  posting_date: Date;

  @ApiProperty({ example: 0, description: 'Application fee amount' })
  @Prop({ default: 0 })
  application_fee: number;

  @ApiPropertyOptional({ example: 'Terms and conditions text', description: 'Terms and conditions' })
  @Prop()
  terms_and_conditions?: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
