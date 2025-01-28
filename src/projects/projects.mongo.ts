import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { FileDto } from 'src/decorator/file.type';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export type ProjectDocument = HydratedDocument<Project>;

@MongoSchema()
export class Project {
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @Prop()
  @ApiProperty({ description: 'Name of the project' })
  name: string;

  @Prop({ type: [String] })
  @ApiProperty({ description: 'Images of the project', type: [FileDto] ,isArray: true })
  images: FileDto[];

  @Prop()
  @ApiProperty({ description: 'Description of the project' })
  description: string;

  @Prop({ type: [String] })
  @ApiProperty({ description: 'Technologies used in the project', type: [String] })
  stacks: string[];

  @Prop()
  @ApiProperty({ description: 'Live URL of the project' })
  liveUrl: string;

  @Prop()
  @ApiProperty({ description: 'Repository URL of the project' })
  repoUrl: string;

  @Prop({ default: 'In Progress' })
  @ApiProperty({ description: 'Status of the project', default: 'In Progress' })
  status: string;

  @Prop({ type: [String] })
  @ApiProperty({ description: 'Key features of the project', type: [String] })
  features: string[];

  @Prop({ type: Date })
  @ApiProperty({ description: 'Start date of the project' })
  startDate: Date;

  @Prop({ type: Date })
  @ApiProperty({ description: 'End date of the project' })
  endDate: Date;

  @Prop({ type: Date, default: Date.now })
  @ApiProperty({ description: 'Creation date of the project' })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  @ApiProperty({ description: 'Last update date of the project' })
  updatedAt: Date;

  @Exclude()
  __v: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
