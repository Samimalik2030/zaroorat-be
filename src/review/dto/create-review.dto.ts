import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { IReview } from 'review/types';

export class CreateReviewDto implements Partial<IReview> {
  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  // @IsInt({ message: 'Stars must be an integer' })
  // @Min(1, { message: 'Stars must be at least 1' })
  // @Max(5, { message: 'Stars must be at most 5' })
  stars: number;

  @ApiProperty({ example: 'dummy comment...' })
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  businessId: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  photos?: any[];
}
