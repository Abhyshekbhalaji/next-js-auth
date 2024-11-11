import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server"; 
import User from "@/models/userModels";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        // Find user by token and check if the token is still valid
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }  // Ensure token is not expired
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }

        console.log("User found:", user);

        // Update user verification status
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        });
    }
}
