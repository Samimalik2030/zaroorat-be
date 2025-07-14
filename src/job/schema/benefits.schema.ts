import { Prop, Schema } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class Benefits {
  @ApiPropertyOptional({ default: false, description: 'Is accommodation provided?' })
  @Prop({ default: false })
  accommodation: boolean;

  @ApiPropertyOptional({ default: false, description: 'Is food provided?' })
  @Prop({ default: false })
  food: boolean;

  @ApiPropertyOptional({ default: false, description: 'Is transport provided?' })
  @Prop({ default: false })
  transport: boolean;

  @ApiPropertyOptional({ default: true, description: 'Is medical coverage provided?' })
  @Prop({ default: true })
  medical: boolean;

  @ApiPropertyOptional({ type: [String], description: 'Other additional benefits' })
  @Prop([String])
  other?: string[];
}
