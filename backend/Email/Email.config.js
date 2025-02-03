import dotenv from "dotenv";
dotenv.config();
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAIL_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: process.env.SENDER_EMAIL,
  name: process.env.SENDER_NAME,
};
