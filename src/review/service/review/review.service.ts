import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery, Types } from "mongoose";
import { CreateReviewDto } from "src/review/dto/create-review.dto";
import { Review } from "src/review/entity/review.mongo";
import { User } from "src/user/user.mongo";


@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}



}