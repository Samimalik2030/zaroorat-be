import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MongoSchema } from 'src/decorator/mongo-schema.decorator';

export class Chest {
  @ApiProperty({ example: 85, description: 'Unexpanded chest size in cm' })
  @Prop()
  unexpanded: number;

  @ApiProperty({ example: 90, description: 'Expanded chest size in cm' })
  @Prop()
  expanded: number;
}

export class PhysicalInfo {
  @ApiProperty({ example: 175, description: 'Height in centimeters' })
  @Prop()
  height_cm: number;

  @ApiProperty({ example: 70, description: 'Weight in kilograms' })
  @Prop()
  weight_kg: number;

  @ApiProperty({ type: Chest, description: 'Chest measurements in cm' })
  @Type(() => Chest)
  @Prop({ type: Chest })
  chest_cm: Chest;

  @ApiProperty({ example: '6/6', description: 'Vision of the candidate' })
  @Prop()
  vision: string;

  @ApiProperty({ example: 'B+', description: 'Blood group of the candidate' })
  @Prop()
  blood_group: string;
}
