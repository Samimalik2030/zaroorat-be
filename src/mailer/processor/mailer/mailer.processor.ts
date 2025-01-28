import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { Job } from 'bullmq';
import { NODE_MAILER } from '../../provider/mailer/mailer.provider';

export const MAIL_QUEUE = 'mail-queue';
export const SEND_MAIL = 'send-mail';

@Processor(MAIL_QUEUE)
export class MailProcessor extends WorkerHost {
  constructor(
    @Inject(NODE_MAILER)
    private readonly transporter: Transporter<
      SMTPTransport.SentMessageInfo,
      SMTPTransport.Options
    >,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    this.transporter.sendMail(job.data);
  }
}
