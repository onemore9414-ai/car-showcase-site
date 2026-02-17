import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface RequestBody {
  email: string;
  code: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { email, code } = req.body as RequestBody;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your verification code",
    text: `Your code is: ${code}`,
  });

  res.status(200).json({ success: true });
}