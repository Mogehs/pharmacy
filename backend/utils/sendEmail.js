// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  });

  console.log(`✅ Email sent to ${to}`);
};

export default sendEmail;
