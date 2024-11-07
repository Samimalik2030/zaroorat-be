import { Test, TestingModule } from '@nestjs/testing';
import { ImageKitService } from './image-kit.service';

describe('ImageKitService', () => {
  let service: ImageKitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageKitService],
    }).compile();

    service = module.get<ImageKitService>(ImageKitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
