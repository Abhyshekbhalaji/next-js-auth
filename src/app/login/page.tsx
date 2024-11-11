"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      toast.loading("Checking credentials...", { id: "loginToast" });

      const res = await axios.post("/api/users/login", user);
      console.log("Login success", res.data);

      // Update toast and navigate to profile on success
      toast.dismiss("loginToast");
      toast.success("Logged in successfully!");
      router.push("/profile");
    } catch (error: any) {
      toast.dismiss("loginToast");
      const errorMessage = error.response?.data?.error || "Login failed";
      console.error("Login error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center text-l">
      <Toaster />
      <h1 className="text-3xl mb-2">Login</h1>
      <hr />

      <CustomInput
        placeholder="email"
        label="Email"
        value={user.email}
        onChange={(e: any) => setUser({ ...user, email: e.target.value })}
        type="email"
      />
      <CustomInput
        placeholder="password"
        label="Password"
        value={user.password}
        onChange={(e: any) => setUser({ ...user, password: e.target.value })}
        type="password"
      />

      <button
        className="rounded-xl p-2 bg-black text-white border border-white hover:bg-white hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onLogin}
        type="submit"
        disabled={buttonDisabled || loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <Link href="/signup" className="mt-2">
        Sign up page
      </Link>
    </div>
  );
};

export default LoginPage;
