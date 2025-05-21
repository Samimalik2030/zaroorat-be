import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path'; // for safe file path resolution

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    userName: string,
    message: string,
  ) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <div style="text-align: center;">
          <img src="cid:logo" alt="Company Logo" style="width: 100px; margin-bottom: 20px;" />
        </div>
        <h2 style="color: #2c3e50;">Hello, ${userName}!</h2>
        <p>${message}</p>
        <p>If you have any questions, feel free to contact us.</p>
        <hr style="margin: 40px 0;" />
        <p style="font-size: 12px; color: #888;">This email was sent by Punjab Police, Lahore, Pakistan</p>
      </div>
    `;

    const mailOptions = {
      from: `"Punjab Police" <${process.env.GMAIL_USERNAME}>`,
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(process.cwd(), 'src', 'common', 'police-logo.png'),

          cid: 'logo',
        },
      ],
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
