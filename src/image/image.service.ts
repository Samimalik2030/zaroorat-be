import { Injectable } from '@nestjs/common';
import { ImageKitService } from 'src/image-kit/image-kit.service';

@Injectable()
export class ImageService {
  constructor(private readonly ImageKitService: ImageKitService) {}

  async create(image: Express.Multer.File) {
    return await this.ImageKitService.uploadImage(image)
  }
}
