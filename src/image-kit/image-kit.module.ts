import { Module } from '@nestjs/common';
import { ImageKitService } from './image-kit.service';
const ImageKit = require('imagekit');

@Module({
  providers: [
    {
      provide: 'IMAGEKIT_INSTANCE',
      useFactory: () => {
        return new ImageKit({
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        });
      },
    },
    ImageKitService,
  ],
  exports: [ImageKitService],
})
export class ImageKitModule {}
