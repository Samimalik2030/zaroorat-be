// create-cart.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsMongoId,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '644b7c58e75b3e001fcaa123', description: 'User ID' })
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    example: '645f123e4b7a2c6a1e8b1111',
    description: 'Product ID',
  })
  @IsMongoId()
  @IsNotEmpty()
  product: string;
}

export class UpdateCartDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}
