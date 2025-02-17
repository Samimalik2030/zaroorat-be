import { Module } from '@nestjs/common';
import { MailerService } from './service/mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService],
  
})
export class MailerModule {}
