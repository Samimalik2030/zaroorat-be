import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Get,
  HttpCode,
  UseGuards,
  Req,
  NotFoundException,
  Query,
  Param,
  Delete,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ReviewService } from 'src/review/service/review/review.service';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { ReviewQuery } from 'src/review/dto/review-query.dto';
import { Review } from 'src/review/entity/review.mongo';


@ApiTags('Reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Get the Reviews of user
  /////////////////////////////////////////////////////////////////////////////////////////////////

  @Get()
  @HttpCode(200)
  async index(
    @Query() query: ReviewQuery
    @Req() req: Request,
  ): Promise<any     > {
    const reviews = await this.reviewService.filter(
      {
        // user: req.user._id,
      },
      {
        populate: [{ path: 'user' }, { path: 'business' }],
      },
    );
    return pagination.dto(reviews);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Get a Review
  /////////////////////////////////////////////////////////////////////////////////////////////////

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({ type: Review, status: 200 })
  async find(@Param('id') id: string): Promise<Review> {
    const review = await this.reviewService.find(id, {
      populate: [{ path: 'user' }, { path: 'business' }],
    });
    return review;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Create a comment
  /////////////////////////////////////////////////////////////////////////////////////////////////

  @Post()
  @HttpCode(201)
  @ApiResponse({ type: Review, status: 201 })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('photos', 10))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateReviewDto,
    @Req() req: Request,
  ) {
    const business = await this.businessService.find(body.businessId);

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    const user = req.user;
    let uploadedFiles = [];
    if (files && files.length > 0) {
      uploadedFiles = await this.fileService.uploadFiles(files);
    } else if (files.length === 1) {
      uploadedFiles = [await this.fileService.uploadFile(files[0])];
    }
    return await this.reviewService.store(uploadedFiles, body, user, {
      populate: [{ path: 'user' }, { path: 'business' }],
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Create a comment
  /////////////////////////////////////////////////////////////////////////////////////////////////

  @Patch(':id')
  @HttpCode(200)
  @ApiResponse({ type: Review, status: 200 })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('photos', 10))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateReviewDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    const review = await this.reviewService.find(id);

    if (!review) {
      throw new NotFoundException('Review not found');
    }
    const reviewUserId = Buffer.isBuffer(review.user.id)
      ? review.user.id.toString('hex')
      : review.user.id;
    if (reviewUserId !== req.user.id) {
      throw new UnauthorizedException(
        'You do not have permission to update this review',
      );
    }
    let uploadedFiles = [];
    if (files && files.length > 0) {
      uploadedFiles = await this.fileService.uploadFiles(files);
    } else if (files.length === 1) {
      uploadedFiles = [await this.fileService.uploadFile(files[0])];
    }
    console.log(uploadedFiles, 'new');
    console.log(...review.photos, 'exisiting');
    const updatedPhotos = [...review.photos, ...uploadedFiles];
    console.log(updatedPhotos, 'updated');
    const updatedReview = await this.reviewService.update(review, {
      ...body,
      photos: updatedPhotos,
    });

    return updatedReview;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //Delete a Review
  /////////////////////////////////////////////////////////////////////////////////////////////////

  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({ type: Review, status: 200 })
  async trash(@Param('id') id: string): Promise<Review> {
    return await this.reviewService.delete(id, {
      populate: [{ path: 'user' }, { path: 'business' }],
    });
  }
}
