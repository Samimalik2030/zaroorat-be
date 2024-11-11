import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDTO } from './posts.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Req()
    req: Request & { user?: { userId: string; email: string; name: string } },
  ): Promise<PostDTO> {
    const userId = req?.user?.userId;
    return this.postsService.createPost(file, userId);
  }
}
