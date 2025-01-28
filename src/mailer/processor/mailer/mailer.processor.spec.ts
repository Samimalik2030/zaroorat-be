import { Test, TestingModule } from '@nestjs/testing';
import { MailProcessor } from './mailer.processor';

describe('MailService', () => {
  let service: MailProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailProcessor],
    }).compile();

    service = module.get<MailProcessor>(MailProcessor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
