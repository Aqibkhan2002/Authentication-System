import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure:true,
  port:parseInt(process.env.MAIL_PORT), 
  auth: {
      user: process.env.SENDER_EMAIL, // Your email address
      pass: process.env.APP_PASSWORD, // Your email password or app password
  },
});

export const sender=process.env.SENDER_EMAIL
