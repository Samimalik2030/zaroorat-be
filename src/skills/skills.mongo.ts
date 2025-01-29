import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { FileDto } from 'src/decorator/file.type';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export type SkillsDocument = HydratedDocument<Skill>;

@MongoSchema()
export class Skill {
  @Transform((obj) => obj.value.toString())
  _id: Types.ObjectId;

  @Prop()
  @ApiProperty({ description: 'Name of the Skill' })
  name: string;

  @Prop({ type: String, trim: true })
  category?: string;

  @Prop()
  @ApiProperty({ description: 'Description' })
  desciption: string;

  @Prop({
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
  })
  level: string;

  @Exclude()
  __v: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
