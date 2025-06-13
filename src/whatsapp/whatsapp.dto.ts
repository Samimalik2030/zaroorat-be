import { ApiProperty } from '@nestjs/swagger';

export class WhatsappMessageDto {
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  adress: string;
}
