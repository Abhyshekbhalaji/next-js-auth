"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import {useRouter} from "next/navigation";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import toast, { Toaster } from "react-hot-toast"

const SignupPage = () => {
const router = useRouter();
  const [user,setUser]=React.useState({
    email:"",
    password:"",
    username:""
  })
  const [buttonDisabled,setButtonDisabled]=useState(false);
  const [loading,setLoading]=useState(false);
  const [logging,setLogging]=useState(false);
const onSignup=async()=>{
try{
  setLoading(true);
 const res=await axios.post("api/users/signup",user);
console.log(res.data);
toast.success("Signup Successful");
setLogging(true);
setTimeout(()=>{
router.push("/login");
},1500)

}catch(error:any){
toast.error(error.message);
}
finally{
  setLoading(false)
}
}
useEffect(()=>{
if(user.email.length>0 && user.password.length>0 && user.username.length>0){
  setButtonDisabled(false);
  setLogging(false);
}else{
  setButtonDisabled(true);
}
},[user])

  return (
    <div className="flex flex-col min-h-screen justify-center items-center text-l">
    
      <Toaster/>
    
      <h1 className="text-3xl mb-2 ">{loading ? "Processing": "Signup"}</h1>

      <hr />
      <CustomInput 
      placeholder="username"
      label="Username"
      value={user.username!}
        onChange={(e:any)=>setUser({...user,username:e.target.value})}
      type="text"/>
      <CustomInput 
      placeholder="email"
      label="Email"
      value={user.email!}
        onChange={(e:any)=>setUser({...user,email:e.target.value})}
        type="email"/>
      <CustomInput 
      placeholder="password"
      label="Password"
      value={user.password!}
        onChange={(e:any)=>setUser({...user,password:e.target.value})}
        type="password"  />
     <button className="rounded-xl p-2 bg-black border border-white hover:bg-white hover:text-black hover:border hover:border-black" onClick={onSignup} type="submit" disabled={buttonDisabled}>
      {buttonDisabled?"No signup" : "Signup"}
     </button>
     <Link href="/login" className="mt-2">Move to Login?</Link>
    </div>
  )
}

export default SignupPage