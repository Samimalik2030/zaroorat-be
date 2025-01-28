import { Test, TestingModule } from '@nestjs/testing';
import { MailerProvider, NODE_MAILER } from './mailer.provider';

describe('NodeMailer', () => {
  let provider: typeof MailerProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerProvider],
    }).compile();

    provider = module.get<typeof MailerProvider>(NODE_MAILER);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
