import { connect } from "../../../../dbconfig/dbconfig";
import User from '../../../../models/userModels';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verifyToken = jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
    const verifyTokenExpiry = Date.now() + 3600000;  // 1 hour expiration

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpiry
    });

    const savedUser = await newUser.save();

    // Send verification email (Assuming sendEmail sends the email with the token)
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id, token: verifyToken });
    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      savedUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
