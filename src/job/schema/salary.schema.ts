import { Prop, Schema } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class Salary {
  @ApiPropertyOptional({ example: 1500 })
  @Prop()
  amount: number;

  @ApiPropertyOptional({ example: 'AED' })
  @Prop()
  currency: string;

  @ApiPropertyOptional({ example: 'Accommodation and food included' })
  @Prop()
  notes: string;
}
