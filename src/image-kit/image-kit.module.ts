import { Module } from '@nestjs/common';
import { ImageKitService } from './image-kit.service';

@Module({
  providers: [ImageKitService]
})
export class ImageKitModule {}
