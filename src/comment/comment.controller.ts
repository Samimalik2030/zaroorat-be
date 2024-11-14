import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { createCommentDto, UpdateCommentDto } from './comment.dto';
import { AuthenticatedRequest } from 'src/interfaces/request.interface';
import { ApiBearerAuth, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Comment } from './comment.mongo';

@Controller('comment')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Get('comments')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getComments(): Promise<Comment[]> {
    const comments = this.CommentService.getComments();
    return comments;
  }

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

  @Get('post/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getCommentsByPostId(@Param('id') id: string): Promise<Comment[]> {
    const comments = this.CommentService.getCommentsOfPost(id);
    return comments;
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getComment(@Param('id') id: string): Promise<Comment> {
    const comment = this.CommentService.getComment(id);
    return comment;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Param('id') id: string,
    @Body() body: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = this.CommentService.updateComment(id, body.comment);
    return comment;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') id: string): Promise<Comment> {
    const comment = this.CommentService.deleteComment(id);
    return comment;
  }
}
