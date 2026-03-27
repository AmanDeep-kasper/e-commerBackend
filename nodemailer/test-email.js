// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendOTPEmail = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'OTP for Email Verification',
//     html: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
//   };

//   await transporter.sendMail(mailOptions);
// };


import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, name, otp) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [email],
    subject: "OTP for Email Verification",
    html: `
      <p>Hi ${name},</p>
      <h3>Your OTP is: <strong>${otp}</strong></h3>
      <p>This OTP expires in 10 minutes.</p>
    `,
  });

  if (error) {
    throw new Error(error.message || "Failed to send OTP email");
  }

  return data;
};