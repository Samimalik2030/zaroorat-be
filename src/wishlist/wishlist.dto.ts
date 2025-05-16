import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({ type: String })
  @IsMongoId({ message: 'Invalid user ID format' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: String })
  @IsMongoId({ message: 'Invalid product ID format' })
  @IsNotEmpty()
  productId: string;
}
