import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // service: 'Gmail',
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for Email Verification",
    html: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
  };

  await transporter.sendMail(mailOptions);
};
