import { ApiProperty } from '@nestjs/swagger';
import { PaginationMeta } from 'common/dto/pagination-meta.dto';
import { IPagination } from 'common/types';
import { Review } from 'review/entity/review.mongo';

export class ReviewPagination implements IPagination<Review> {
  @ApiProperty({
    type: Review,
    isArray: true,
  })
  data: Review[];

  @ApiProperty()
  pagination: PaginationMeta;
}
