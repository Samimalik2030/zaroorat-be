import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { createCommentDto } from './comment.dto';
import { AuthenticatedRequest } from 'src/interfaces/request.interface';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Comment } from './comment.mongo';

@Controller('comment')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post('create-comment')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req: AuthenticatedRequest,
    @Body() body: createCommentDto,
  ) {
    const { id } = req.user;
    const comment = await this.CommentService.createComment(id, body);
    return comment;
  }

  @Post('post/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCommentsByPostId(@Param('id') id: string): Promise<Comment[]> {
    const comments = this.CommentService.getCommentsOfPost(id);
    return comments;
  }
}
