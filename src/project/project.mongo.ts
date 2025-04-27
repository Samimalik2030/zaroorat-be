import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileDto } from 'src/decorator/file.type';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';



@MongoSchema()
export class Project {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  materials: string[];

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop(FileDto)
  image: FileDto;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
