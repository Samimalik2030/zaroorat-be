import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path'; // for safe file path resolution
import * as fs from 'fs';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: 'api',
        pass: process.env.MAILTRAP_API_TOKEN,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    userName: string,
    message: string,
  ) {
    // Read image file and convert to Base64
    const imagePath = path.join(process.cwd(), 'src', 'common', 'logo.png');
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');
    const mimeType = 'image/png'; // or 'image/png' depending on your logo

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <div style="text-align: center;">
          <img src="data:${mimeType};base64,${base64Image}" alt="Company Logo" style="width: 100px; margin-bottom: 20px;" />
        </div>
        <h2 style="color: #2c3e50;">Hello, ${userName}!</h2>
        <p>${message}</p>
        <p>If you have any questions, feel free to contact us.</p>
        <hr style="margin: 40px 0;" />
        <p style="font-size: 12px; color: #888;">This email was sent by Zaroorat, Multan, Pakistan</p>
      </div>
    `;

    const mailOptions = {
      from: '"Zaroorat" <no-reply@www.zaroorat.com.pk>',
      to,
      subject,
      html: htmlContent,
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
