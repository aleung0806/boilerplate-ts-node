import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../utils/logger';

let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.username,
    pass: config.email.password
  }
});

transport
  .verify()
  .then(() => logger.info('connected to email server'))
  .catch((err) => logger.error(`Unable to connect to email server. ${err}`));

const sendEmail = async (email:string, subject:string, text:string) => {
  let message = {
    from: config.email.username,
    to: email,
    subject: subject,
    text: text
  };
  await transport.sendMail(message);
}

export default {
  sendEmail
}