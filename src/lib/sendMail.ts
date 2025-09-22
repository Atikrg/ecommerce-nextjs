import nodemailer from "nodemailer";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const SMTP_HOST = process.env.SMTP_HOST!;
const SMTP_PORT = Number(process.env.SMTP_PORT);
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!; // your site URL

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendResetLink(email: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: expires,
    },
  });

  const resetUrl = `${BASE_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(
    email
  )}`;

  await transporter.sendMail({
    from: `"My Shop" <${SMTP_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>Hi,</p>
      <p>You requested a password reset. Click the link below to reset your password. The link is valid for 10 minutes.</p>
      <p><a href="${resetUrl}" style="color: #4f46e5;">Reset Password</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  });

  return { success: true, token };
}
