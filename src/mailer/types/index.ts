export type MailTemplate =
  | 'send-otp'
  | 'change-password'
  | 'welcome'
  | 'verify-email';

export type SendOtpContext = {
  secret: string;
  intent: string;
};

export type ChangePasswordContext = object;
export type WelcomeContext = object;
