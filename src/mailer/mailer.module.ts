import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MailProcessor } from './processor/mailer/mailer.processor';
import { MailerService } from './service/mailer/mailer.service';
import { MailerProvider } from './provider/mailer/mailer.provider';
import { ConfigModule } from '@nestjs/config';
import { MAIL_QUEUE } from './processor/mailer/mailer.processor';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    BullModule.registerQueue({
      name: MAIL_QUEUE,
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
  ],
  providers: [MailProcessor, MailerService, MailerProvider],
  exports: [MailerService],
})
export class MailerModule {}
