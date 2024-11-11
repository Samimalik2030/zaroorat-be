import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './posts.mongo';
import { Model } from 'mongoose';
import { PostDTO } from './posts.dto';
import { ImageKitService } from 'src/image-kit/image-kit.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly imageKitService: ImageKitService,
  ) {}

  async createPost(file: Express.Multer.File, userId: any): Promise<PostDTO> {
    const url = await this.imageKitService.uploadImage(file);
    const post = await this.postModel.create({
      url: url,
      userId: userId,
    });
    return post;
  }
}
