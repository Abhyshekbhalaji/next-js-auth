import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { connect } from "@/dbconfig/dbconfig";
connect();
export const getDataFromToken=function(request:NextRequest){
    try {   
        const token =request.cookies.get("token")?.value || '';
        if (!token) throw new Error("Token not found");
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        if(!decoded){
            return new Error("error while decoding")
        }
        return decoded.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}