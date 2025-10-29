import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// A transporter is like a “mailman”  → it knows how to connect to Gmail’s SMTP server.
// service: "Gmail" → tells Nodemailer you’re using Gmail as the provider.
// port: 465, secure: true → means it uses SSL encryption (the secure way).
// auth → your Gmail credentials are pulled from.env.

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: `"MealMate 🍴" <${process.env.EMAIL}>`,
    to,
    subject: "🔑 Reset your MealMate password",
    text: `Hello!

We received a request to reset your MealMate account password.
Your OTP code is: ${otp}

Please enter this code in the app to reset your password.
If you didn’t request this, you can safely ignore this email.

Stay hungry, stay happy! 🍕🥗
– The MealMate Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #fff9f6; border-radius: 10px; border: 1px solid #f4e2e1;">
        <h2 style="color: #ff4d2d; text-align: center;">🍴 MealMate</h2>
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 15px; color: #555;">
          We received a request to reset your <b>MealMate</b> password.
          Use the OTP below to reset it:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #ff4d2d; padding: 10px 20px; border: 2px dashed #ff4d2d; border-radius: 8px; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #555;">
          This OTP will expire in <b>10 minutes</b>. If you didn’t request this, you can ignore this email.
        </p>
        <p style="font-size: 15px; margin-top: 20px; color: #333;">
          Stay hungry, stay happy! 🍕🥗 <br/>
          – The MealMate Team
        </p>
      </div>
    `,
  });
};

export const sendDeliveryOtpToUser = async (user, otp) => {
  await transporter.sendMail({
    from: `"MealMate 🍴" <${process.env.EMAIL}>`,
    to: user.email,
    subject: "🍴 MealMate Delivery OTP Verification",
    text: `Hello!

Your MealMate order is arriving!

To receive your food package, please provide the following OTP code to our delivery partner:
OTP code: ${otp}

This helps ensure you receive your meal securely.
If you didn’t place this order, please notify us immediately.

Enjoy your food! 🍕🥗
– The MealMate Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #fff9f6; border-radius: 10px; border: 1px solid #f4e2e1;">
        <h2 style="color: #ff4d2d; text-align: center;">🍴 MealMate Delivery</h2>
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 15px; color: #555;">
          Your MealMate order is arriving! Please provide the OTP below to our delivery partner to verify and receive your food:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #ff4d2d; padding: 10px 20px; border: 2px dashed #ff4d2d; border-radius: 8px; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #555;">
          This OTP is valid for <b>5 minutes</b>. If you did not place this order, please notify us immediately.
        </p>
        <p style="font-size: 15px; margin-top: 20px; color: #333;">
          Enjoy your food! 🍕🥗 <br/>
          – The MealMate Team
        </p>
      </div>
    `,
  });
};
