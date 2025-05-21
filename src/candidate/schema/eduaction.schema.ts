import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';


export class EducationLevel {
  @ApiProperty({ example: 'Lahore Board', description: 'Name of the examination board' })
  @Prop({ required: true })
  board: string;

  @ApiProperty({ example: 2019, description: 'Year of passing the exam' })
  @Prop({ required: true })
  passing_year: number;

  @ApiProperty({ example: 85.5, description: 'Percentage marks obtained' })
  @Prop({ required: true })
  marks_percentage: number;
}



export class Education {
  @ApiProperty({ type: EducationLevel })
  @Type(() => EducationLevel)
  @Prop({ type: EducationLevel})
  matric: EducationLevel;

  @ApiProperty({ type: EducationLevel })
  @Type(() => EducationLevel)
  @Prop({ type: EducationLevel })
  intermediate: EducationLevel;
}


