import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageKitModule } from 'src/image-kit/image-kit.module';

@Module({
  imports:[
    ImageKitModule
  ],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
