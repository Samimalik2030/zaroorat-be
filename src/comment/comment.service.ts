import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.mongo';
import { Model } from 'mongoose';
import { createCommentDto } from './comment.dto';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly PostService: PostsService,
  ) {}

  async createComment(userId: string, body: createCommentDto) {
    const newComment = await this.commentModel.create({
      comment: body.comment,
      postId: body.postId,
      userId: userId,
    });

    await this.PostService.pushCommentIds(body.postId, newComment.id);
    return newComment;
  }
}
