import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaginationQuery } from 'common/class/pagination-query.class';

export class ReviewQuery extends PartialType(PaginationQuery) {
  @ApiProperty({ required: false })
  stars: number;
}
