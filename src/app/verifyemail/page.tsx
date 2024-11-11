"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const VerifyEmail = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const verifyUserEmail = async () => {
    try {
      console.log("Verifying with token:", token); // Debugging step to confirm token
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError("");
    } catch (err:any) {
      setVerified(false);
      const errorMsg = err.response?.data?.error || "Verification failed. Please try again.";
      setError(errorMsg);  // Display specific error message
      console.log("Verification error:", errorMsg); // Additional logging for debugging
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="mt-4 bg-orange-500 text-black p-2">{token ? `Token: ${token}` : "No token found"}</h2>

      {verified ? (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login" className="text-blue-500">
            Go to Login
          </Link>
        </div>
      ) : error ? (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
          <p>{error}</p> {/* Display specific error message */}
        </div>
      ) : (
        <p className="text-xl">Verifying...</p>
      )}
    </div>
  );
};

export default VerifyEmail;
