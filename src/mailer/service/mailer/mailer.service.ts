import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Transporter } from 'nodemailer';
import { User } from '../../../user/entity/user.mongo';
import {
  DelayOptions,
  TIME_DELAY,
  TimeDelay,
} from '../../../shared/provider/time-delay/time-delay.provider';
import { MAIL_QUEUE, SEND_MAIL } from '../../processor/mailer/mailer.processor';
import { NODE_MAILER } from '../../provider/mailer/mailer.provider';
import { MailTemplate } from 'mailer/types';

@Injectable()
export class MailerService implements OnModuleInit {
  private readonly logger = new Logger(MailerService.name);

  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly emailQueue: Queue,
    @Inject(NODE_MAILER) private readonly nodeMailer: Transporter,
    @Inject(TIME_DELAY)
    private readonly timeDelay: TimeDelay,
  ) {}

  async onModuleInit() {
    if ((await this.emailQueue.client).status === 'ready') {
      this.logger.log('Email Queue is ready');
    } else {
      this.logger.error('Email Queue is not ready');
    }
  }

  async send<TContext>(payload: {
    to: (User | { firstName?: string; email: string })[];
    subject: string;
    template: MailTemplate;
    context?: TContext;
    delay?: DelayOptions;
  }) {
    const queue = this.emailQueue;
    const delay = this.timeDelay(payload.delay);
    let sendMail = function (data) {
      queue.add(SEND_MAIL, data, {
        delay,
      });
    };

    if ((await this.emailQueue.client).status !== 'ready') {
      const nodeMailer = this.nodeMailer;
      sendMail = function (data) {
        nodeMailer.sendMail(data);
      };
    }

    payload.to.forEach((rec) => {
      const data = {
        to: rec.email,
        from: process.env.MAIL_FROM,
        subject: payload.subject,
        template: payload.template,
        context: {
          ...payload.context,
          firstName: rec.firstName || 'User',
          companyName: process.env.APP_NAME,
          companyLogoUrl: process.env.MAIL_COMPANY_LOGO_URL,
        },
      };
      sendMail(data);
    });
  }

  // async sendWelcomeEmail(user: User) {
  //   await this.send({
  //     to: [user],
  //     subject: 'Welcome to our platform',
  //     template: 'welcome',
  //     context: {},
  //   });
  // }

  // async sendOtpSentEmail(email: string, intent: string, secret: string) {
  //   await this.send({
  //     to: [{ email }],
  //     subject: type,
  //     template: 'verify-email',
  //     context: { intent: email.toLowerCase(), secret },
  //   });
  // }

  // email(payload: {
  //   to: (User | { firstName?: string; email: string })[];
  //   subject: string;
  //   template: keyof typeof MailTemplates;
  //   delay?: DelayOptions;
  // }) {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const cont = MailTemplates[payload.template];
  //   async function send(context: typeof cont) {
  //     const queue = this.emailQueue;
  //     const delay = this.timeDelay(payload.delay);
  //     let sendMail = function (data) {
  //       queue.add(SEND_MAIL, data, {
  //         delay,
  //       });
  //     };
  //     if ((await this.emailQueue.client).status !== 'ready') {
  //       const nodeMailer = this.nodeMailer;
  //       sendMail = function (data) {
  //         nodeMailer.sendMail(data);
  //       };
  //     }
  //     payload.to.forEach((rec) => {
  //       const data = {
  //         to: rec.email,
  //         from: process.env.MAIL_FROM,
  //         subject: payload.subject,
  //         template: payload.template,
  //         context: {
  //           ...context,
  //           firstName: rec.firstName || 'User',
  //         },
  //       };
  //       sendMail(data);
  //     });
  //   }
  //   return {
  //     send,
  //   };
  // }
}
