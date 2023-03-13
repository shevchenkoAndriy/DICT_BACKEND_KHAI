import nodemailer from "nodemailer";
import { SENDER_PASS, SENDER_EMAIL } from "../Common/config";

export class EmailSenderService {
  nodemailerService = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASS,
    },
  });

  sendWelcomingLetter() {
    const message = {
      from: SENDER_EMAIL,
      to: "s.s.andriy@student.khai.edu",
      subject: "Test email",
      text: "This is a test email from Nodemailer.",
    };

    nodemailerService.sendMail(message).then(console.log).catch(console.error);
  }
}
