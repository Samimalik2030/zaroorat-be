import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment } from '../schema/comment.mongo';
import { InjectModel } from '@nestjs/mongoose';
import { createCommentDto } from '../dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async getComments(): Promise<Comment[]> {
    const comments = await this.commentModel.find();
    return comments;
  }

  async createComment(userId: string, body: createCommentDto) {
    const newComment = await this.commentModel.create({
      comment: body.comment,
      postId: body.postId,
      userId: userId,
    });
    return newComment;
  }

  async getCommentsOfPost(id: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ postId: id });
    return comments;
  }

  async getComment(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id);
    return comment;
  }

  async updateComment(id: string, comment: string): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      id,
      {
        comment: comment,
      },
      {
        new: true,
      },
    );
    return updatedComment;
  }

  async deleteComment(id: string): Promise<Comment> {
    const deletedComment = await this.commentModel.findByIdAndDelete(id);
    return deletedComment;
  }
}
