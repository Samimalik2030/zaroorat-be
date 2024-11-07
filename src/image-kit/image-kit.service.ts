import { Injectable } from '@nestjs/common';

// Using `require` to import the ImageKit module
const ImageKit = require('imagekit');

@Injectable()
export class ImageKitService {
  private imageKit: InstanceType<typeof ImageKit>; // Use InstanceType to define the instance type

  constructor() {
    // Initialize ImageKit
    this.imageKit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }

  async uploadImage(file: Express.Multer.File) {
    // Now TypeScript knows `this.imageKit` is an instance of ImageKit with the correct type
    const uploadedImage = await this.imageKit.upload({
      file: file.buffer.toString('base64'),
      fileName: `${Date.now()}-${file.originalname}`,
    });
    return uploadedImage.url;
  }
}
