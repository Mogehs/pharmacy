import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRequestPasswordResetMutation } from "./features/userApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [requestPasswordReset] = useRequestPasswordResetMutation();

  const handleSendOtp = () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email.", { position: "top-center" });
      return;
    }
    requestPasswordReset(email);
    toast.success("OTP sent successfully!", { position: "top-center" });
    setOtpSent(true);
  };

  return (
    <div className="flex justify-center items-center py-24 bg-gray-100 min-h-screen">
      <div className="p-8 shadow-2xl rounded-md bg-white w-[30rem]">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>

        {!otpSent ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-blue-200 p-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendOtp}
              className="bg-blue-500 cursor-pointer text-white p-2 rounded-lg w-full hover:bg-blue-600 focus:outline-none"
            >
              Send Reset Link
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center space-x-4 text-center">
              Password Reset Link is Sent to Email Please Check Out Your Mail
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
