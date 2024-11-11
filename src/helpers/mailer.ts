import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    const updateFields = {
      VERIFY: { verifyToken: hashedToken, resetPasswordExpires: Date.now() + 3600000 },
      RESET: { forgotPasswordToken: hashedToken, forgotPasswordExpires: Date.now() + 3600000 }
    };

    await User.findByIdAndUpdate(userId, updateFields[emailType]);

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS
      }
    });

    const mailOptions = {
      from: "abhyshekbhalaji@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
