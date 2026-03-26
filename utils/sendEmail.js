import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
//   port: 587,
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter
  .verify()
  .then(() => console.log("✅ SMTP ready"))
  .catch((err) => console.error("❌ SMTP verify failed:", err));

export const sendOTPEmail = async (email, otp, name = "User") => {
  await transporter.sendMail({
    from: `"LazerCut" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OTP for Email Verification",
    html: `<p>Hi ${name},</p><p>Your signup OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p> <p>So Just Now...</p>`,
  });
};
