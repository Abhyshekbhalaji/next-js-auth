import {connect} from "../../../../dbconfig/dbconfig"
import User from '../../../../models/userModels'
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
connect();

export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json();
        const {email,password}=reqBody;

       const user=await User.findOne({email})
       if(!user){
        return NextResponse.json({error:"User doesnt exist"},{status:400})
       }
       const validPassword=await bcrypt.compare(password,user.password);
       if(!validPassword){
        return NextResponse.json({error:"Invalid password"},{status:400})
       }
       // create Token Data
       const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email
       }
       const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1h"})
        const response=NextResponse.json({
            message:"Login Successful",
            success:true
        })
        response.cookies.set("token",token,{httpOnly:true})
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}