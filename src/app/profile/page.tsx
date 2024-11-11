"use client";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router=useRouter();
  const [data, setData] = React.useState("");
 const  onLogout =async function(){
    try {
     await axios.get('/api/users/logout');
    toast.loading("logging out...")
      setTimeout(()=>{
        toast.dismiss();
          router.push("/login")
          toast.success("Logged out successfully")
      },1000)
      setTimeout(() => {
          toast.dismiss();
      }, 1500);
      
   
    } catch (error:any) {
      console.log(error.message)
        toast.error(error.message);
    }
  }
  const getUserDetails =async ()=>{
    const res=await axios.get('/api/users/user');
    setData(res.data.data._id)
 
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <Toaster/>
        <h1>Profile</h1>
        <hr/>
        <p>Profile Page</p>
        <hr/>
        <button type="submit" className='bg-black mt-4 hover:bg-white hover:text-black text-white rounded-xl p-2 hover:border-solid  hover:border-black' onClick={onLogout}>Logout</button>
      <button type="button" className='bg-black mt-4 hover:bg-white hover:text-black text-white rounded-xl p-2 hover:border-solid  hover:border-black' onClick={getUserDetails}>Get User</button>
      
       {data && (
         <button type="submit" className='bg-black mt-4 hover:bg-white hover:text-black text-white rounded-xl p-2 hover:border-solid  hover:border-black'>
        <Link href={
           `/profile/${data}` 
          }>Go to Profile</Link>
       
        </button>
       ) }
        </div>
  )
}

export default Profile