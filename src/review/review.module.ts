import { Module } from '@nestjs/common';
import { ReviewService } from './service/review/review.service';
import { Review, ReviewSchema } from './entity/review.mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './controller/review/review.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
   
  ],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
