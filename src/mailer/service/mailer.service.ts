import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Load configuration from environment variables
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // SMTP host
      port: parseInt(process.env.MAIL_PORT, 10), // SMTP port
      secure: false, // Use TLS (false because Mailtrap doesn't require secure connection)
      auth: {
        user: process.env.MAIL_USERNAME, // Mailtrap username
        pass: process.env.MAIL_PASSWORD, // Mailtrap password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: 'msamiullah2030@gmail.com',
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
