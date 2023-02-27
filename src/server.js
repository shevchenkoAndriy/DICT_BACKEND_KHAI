import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const { SENDER_EMAIL, SENDER_PASS } = process.env

const emailService = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS,
  },
});

const message = {
  from: SENDER_EMAIL,
  to: "s.s.andriy@student.khai.edu",
  subject: "Test email",
  text: "This is a test email from Nodemailer.",
};

emailService.sendMail(message).then(console.log).catch(console.error)
