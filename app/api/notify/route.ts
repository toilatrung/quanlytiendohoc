import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();

  if (!to || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
