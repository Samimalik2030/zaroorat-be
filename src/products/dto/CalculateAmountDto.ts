import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CalculateAmountDto{
  @ApiProperty({ example: 'asfg' })
  @IsString()
  productId: string;


  @ApiProperty({ example: 9 })
  @IsNumber()
  count: number;
}