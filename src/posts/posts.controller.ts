import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Param,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/jwtAuthGuard';
import { PostsService } from './posts.service';
import { ApiFile } from 'src/decorator/api-file.decorator';
import { AuthenticatedRequest } from 'src/interfaces/request.interface';
import { PostDTO } from './posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('get-posts')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getPosts(): Promise<PostDTO[]> {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Post('create-post')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiFile()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const { id } = req.user;
    const post = await this.postsService.createPost(file, id);
    return post;
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getPost(@Param('id') id: string): Promise<PostDTO> {
    const post = await this.postsService.getPost(id);
    return post;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiFile()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async updatePost(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PostDTO> {
    const post = await this.postsService.updatePost(id, file);
    return post;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string): Promise<PostDTO> {
    const post = await this.postsService.deletePost(id);
    return post;
  }
}
