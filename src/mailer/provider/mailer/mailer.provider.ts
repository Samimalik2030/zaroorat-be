import * as nodemailer from 'nodemailer';
import * as expressHandlebars from 'nodemailer-express-handlebars';
import * as path from 'path';

export const NODE_MAILER = 'NODE_MAILER';

export const MailerProvider = {
  provide: NODE_MAILER,
  useFactory: async () => {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      from: process.env.MAIL_FROM,
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
    });
    const templateDir = path.resolve('src/mailer/template');
    transport.use(
      'compile',
      expressHandlebars({
        viewEngine: {
          extname: '.hbs',
          partialsDir: templateDir,
          layoutsDir: templateDir,
          defaultLayout: 'email.layout.hbs',
        },
        viewPath: templateDir,
        extName: '.hbs',
      }),
    );
    return transport;
  },
};
