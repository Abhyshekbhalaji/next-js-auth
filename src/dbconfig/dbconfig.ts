import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URL!);
       const connection =mongoose.connection;
       connection.on("connected",()=>{
        console.log("MONGO DB CONNECTED...")
       })
       connection.on("error",()=>{
        console.log("MONGO DB CONNECTION ERROR")
       })
    }
    catch(error){
        console.log(error);
    }
}
