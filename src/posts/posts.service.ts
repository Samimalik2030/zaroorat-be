import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './posts.mongo';
import { Model, set, Types } from 'mongoose';
import { PostDTO } from './posts.dto';
import { ImageKitService } from 'src/image-kit/image-kit.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly imageKitService: ImageKitService,
  ) {}

  async getPosts(): Promise<any> {
    const post = await this.postModel.find();
    return post;
  }

  async createPost(file: Express.Multer.File, userId: string): Promise<any> {
    const { url, fileId } = await this.imageKitService.uploadImage(file);
    const post = await this.postModel.create({
      url: url,
      userId: userId,
      imageId: fileId,
    });
    return post;
  }

  async getPost(id: string): Promise<any> {
    const post = await this.postModel.findById(id);
    return post;
  }

  async updatePost(id: string, file: Express.Multer.File): Promise<any> {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new Error('Post not found');
      }
      if (post.imageId) {
        try {
          console.log(post.imageId, 'id');
          await this.imageKitService.deleteImage(post.imageId);
        } catch (deleteError) {
          throw new Error(
            `Error deleting old image from ImageKit: ${deleteError.message}`,
          );
        }
      }
      const image = await this.imageKitService.uploadImage(file);
      const updatedPost = await this.postModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            url: image.url,
            imageId: image.fileId,
            updatedAt: new Date(),
          },
        },
        { new: true },
      );
      if (!updatedPost) {
        throw new Error('Error updating the post in the database');
      }
      return updatedPost;
    } catch (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }
  }

  async deletePost(id: string): Promise<any> {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      if (post.imageId) {
        try {
          await this.imageKitService.deleteImage(post.imageId);
        } catch (deleteError) {
          throw new Error(
            `Error deleting image from ImageKit: ${deleteError.message}`,
          );
        }
      }
      const deletedPost = await this.postModel.findByIdAndDelete(id);
      if (!deletedPost) {
        throw new Error('Error deleting the post from the database');
      }

      return deletedPost;
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }

  async pushCommentIds(postId: string, id: Types.ObjectId): Promise<string> {
    await this.postModel.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          comments: id,
        },
      },
      { new: true },
    );
    return 'Comment pushed successfully!';
  }
}
