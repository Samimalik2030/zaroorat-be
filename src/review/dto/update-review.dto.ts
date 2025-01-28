import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IReview } from 'review/types';

export class UpdateReviewDto implements Partial<IReview> {
  @ApiProperty({ example: 5, description: 'Stars rating (1-5)' })
  @IsNotEmpty({ message: 'Stars rating is required' })
  // @IsInt({ message: 'Stars must be an integer' })
  // @Min(1, { message: 'Stars must be at least 1' })
  // @Max(5, { message: 'Stars must be at most 5' })
  stars: number;

  @ApiProperty({ example: 'Great product!', description: 'Review comment' })
  @IsNotEmpty({ message: 'Comment is required' })
  comment: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
    description: 'Optional photos for the review',
  })
  @IsOptional()
  photos?: any[];
}
