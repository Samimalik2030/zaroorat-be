import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageKitModule } from 'src/image-kit/image-kit.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Post, PostSchema } from './post/schema/posts.mongo';
import { Comment, CommentSchema } from './comment/schema/comment.mongo';
import { PostsService } from './post/service/posts.service';
import { CommentService } from './comment/service/comment.service';
import { PostsController } from './post/controller/post.controller';
import { CommentController } from './comment/controller/comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    ImageKitModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [PostsService, CommentService],
  controllers: [PostsController, CommentController],
  exports: [PostsService, CommentService],
})
export class SocialMediaModule {}
