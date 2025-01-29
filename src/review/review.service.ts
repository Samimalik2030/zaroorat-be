import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.mongo';
import { Model } from 'mongoose';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>,
    ) { }

    async createReview(data:CreateReviewDto):Promise<Review> {
       return await this.reviewModel.create(data);
    }

    async getReviews():Promise<Review[]> {
        return await this.reviewModel.find().exec();
    }


    async getReviewById(id:string):Promise<Review> {
        return await this.reviewModel.findById(id).exec();
    }


    async updateReview(id:string, data:UpdateReviewDto):Promise<Review> {
        return await this.reviewModel.findByIdAndUpdate(id, data, {new:true}).exec();
     }


    async deleteReview(id:string):Promise<Review> { 
    return await this.reviewModel.findByIdAndDelete(id).exec();
    }
}
