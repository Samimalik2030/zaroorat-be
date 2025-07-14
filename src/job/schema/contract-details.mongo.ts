import { Prop, Schema } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ContractDetails {
  @ApiPropertyOptional({ example: 24, description: 'Duration of the contract in months' })
  @Prop()
  durationMonths?: number;

  @ApiPropertyOptional({ default: true, description: 'Is the contract renewable?' })
  @Prop({ default: true })
  renewable: boolean;

  @ApiPropertyOptional({ example: 6, description: 'Working days per week' })
  @Prop()
  workingDaysPerWeek?: number;

  @ApiPropertyOptional({ example: 8, description: 'Working hours per day' })
  @Prop()
  workingHoursPerDay?: number;

  @ApiPropertyOptional({ default: true, description: 'Is overtime available?' })
  @Prop({ default: true })
  overtimeAvailable: boolean;
}
