import Mailgen from 'mailgen';
import type { SendMailOptions } from 'nodemailer';
import { createTransport } from 'nodemailer';

import type { IUser } from '../models/types/user.types.js';
import { EMAIL_MAIN_URI, EMAIL_SECRET, EMAIL_USER } from './env.config.js';
import { errorLogger, infoLogger } from './logger.config.js';

const transporter = createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_SECRET,
  },
});

const registerEmail = async (
  userEmail: string,
  user: IUser,
  emailTemplate: 'registration' | 'emailUpdate',
): Promise<void> => {
  const { token } = await user.generateRegisterToken();

  const mailGenerator = new Mailgen({
    theme: 'cerberus',
    product: {
      name: 'Guitar Shop',
      link: `${EMAIL_MAIN_URI}`,
    },
  });

  let emailContent;
  if (emailTemplate === 'registration') {
    emailContent = {
      intro: 'Welcome to Guitar Shop!',
      instructions: 'To get started with your account, please click the button below:',
      buttonText: 'Confirm Email',
      outro: 'Need help, or have questions? Just reply to this email—we\'d love to help out.',
    };
  } else if (emailTemplate === 'emailUpdate') {
    emailContent = {
      intro: 'Your email has been changed successfully!',
      instructions: 'To verify your new email, please click the button below:',
      buttonText: 'Verify Email',
      outro: 'If you did not request this change, please contact us immediately.',
    };
  } else {
    throw new Error('Invalid email template');
  }

  const email = {
    body: {
      name: userEmail,
      intro: emailContent.intro,
      action: {
        instructions: emailContent.instructions,
        button: {
          color: '#1A73e8',
          text: emailContent.buttonText,
          link: `${EMAIL_MAIN_URI}verification?t=${token}`,
        },
      },
      outro: emailContent.outro,
    },
  };

  const emailBody = mailGenerator.generate(email) as string;
  const mailOptions = {
    from: `Guitar Shop <${EMAIL_USER}>`,
    to: userEmail,
    subject: 'Welcome to Guitar Shop!',
    html: emailBody,
  };

  const sendEmail = (
    options: SendMailOptions,
  ) => new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        errorLogger.error(error);
        reject(error);
      } else {
        infoLogger.info(`Email sent:${info.response}`);
        resolve(info);
      }
    });
  });

  await sendEmail(mailOptions);
};

export default registerEmail;
