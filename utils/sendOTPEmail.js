import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

export const sendOTPEmail = async (email, name, otp) => {
  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing in .env");
  }

  if (!emailFrom) {
    throw new Error("EMAIL_FROM is missing in .env");
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: emailFrom,
    to: [email],
    subject: "OTP for Email Verification",
    html: `
      <p>Hi ${name},</p>
      <h3>Your OTP is: <strong>${otp}</strong></h3>
      <p>This OTP expires in 10 minutes.</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message || "Failed to send OTP email");
  }

  return data;
};