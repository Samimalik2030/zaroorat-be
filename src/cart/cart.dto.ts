// create-cart.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '644b7c58e75b3e001fcaa123', description: 'User ID' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '645f123e4b7a2c6a1e8b1111', description: 'Product ID' })
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ example: 'White', description: 'Color of the product' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: '60x30', description: 'Size of the product' })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsNumber()
  @Min(1)
  quantity: number;
}



export class UpdateCartDto extends PartialType(CreateCartDto) {
    @IsOptional()
    @IsString()
    color?: string;
  
    @IsOptional()
    @IsString()
    size?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity?: number;
  }