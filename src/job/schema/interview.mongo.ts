import { Prop, Schema } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class Interview {
  @ApiPropertyOptional({ example: '2025-06-25T08:00:00Z' })
  @Prop()
  date: Date;

  @ApiPropertyOptional({ example: 'Online' })
  @Prop()
  mode: string;

  @ApiPropertyOptional({ example: 'Lahore Office' })
  @Prop()
  location: string;

  @ApiPropertyOptional({ example: 'Bring original documents' })
  @Prop()
  notes: string;
}
