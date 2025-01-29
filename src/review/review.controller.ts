import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiResponse } from '@nestjs/swagger';
import { Review } from './review.mongo';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';

@Controller('reviews')
export class ReviewController {
    constructor(
        private reviewService: ReviewService
    ) {}

    @Post()
    @ApiResponse({status:201,type:Review})
    async createReview(
        @Body() data:CreateReviewDto
    ) {
        return await this.reviewService.createReview(data);
    }


    @Get()
    @ApiResponse({status:200,type:[Review]})
    async getReviews() {
        return await this.reviewService.getReviews();
    }



    @Get(':id')
    @ApiResponse({status:200,type:Review})
    async getReviewById(
        @Param('id') id:string) {
        return await this.reviewService.getReviewById(id);
    }


    @Patch(':id')
    @ApiResponse({status:200,type:Review})
    async updateReview(
        @Param('id') id:string,
        @Body() data:UpdateReviewDto
    ) {
        return await this.reviewService.updateReview(id, data);
    }


    @Delete(':id')
    @ApiResponse({status:200,type:Review})
    async deleteReview(
        @Param('id') id:string
    ) {
        return await this.reviewService.deleteReview(id);
    }
}
