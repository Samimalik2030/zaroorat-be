import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';
import { Candidate } from 'src/candidate/schema/candidate.monogo';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Job } from 'src/job/job.mongo';

export type JobDocument = Application & Document;

@MongoSchema()
export class Application {
  @ApiProperty({
    description: 'Unique identifier of the job',
    type: String,
    example: '60f7a1c5e5b3a72b3c8a830f',
  })
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Male', description: 'Status of the job' })
  @Prop()
  status: string;

  @ApiProperty({
    type: () => Candidate,
    description: 'Reference to the candidate account',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  })
  candidate: MongooseSchema.Types.ObjectId | Candidate;

  @ApiProperty({
    type: () => Candidate,
    description: 'Reference to the Job',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Job',
    required: true,
  })
  job: MongooseSchema.Types.ObjectId | Job;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
