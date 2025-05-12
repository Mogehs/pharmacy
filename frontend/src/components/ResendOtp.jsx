import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useResendOTPMutation, useVerifyOTPMutation } from "./features/userApi";
import { useSelector } from "react-redux";

const ResendOtp = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const user = useSelector((state) => state.user);
  console.log(user);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [resendOtp, { isLoading: resend }] = useResendOTPMutation();
  const [verifyOtp] = useVerifyOTPMutation();

  const handleSendOtp = async () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email.", { position: "top-center" });
      return;
    }

    try {
      await resendOtp(email).unwrap();
      toast.success("OTP sent successfully!", { position: "top-center" });
      setOtpSent(true);
    } catch (error) {
      toast.error("Failed to send OTP", { position: "top-center" });
      console.log(error);
    }
  };

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      toast.error("Please enter the full 6-digit OTP.", {
        position: "top-center",
      });
      return;
    }

    try {
      await verifyOtp({ email, otp: finalOtp }).unwrap();
      toast.success("OTP verified successfully!", { position: "top-center" });
      navigate("/login");
    } catch (err) {
      toast.error("Invalid OTP", { position: "top-center" });
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center py-24 bg-gray-100 min-h-screen">
      <div className="p-8 shadow-2xl rounded-md bg-white w-[30rem]">
        <h1 className="text-2xl font-bold mb-6 text-center">Resend OTP</h1>

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
              className="bg-blue-500 cursor-pointer text-white p-2 rounded-lg w-full hover:bg-blue-600"
              disabled={resend}
            >
              Resend OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p className="mb-4 text-gray-600">
              Enter the 6-digit OTP sent to your email
            </p>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-10 h-10 text-center border border-blue-300 rounded focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="mt-4 bg-green-500 cursor-pointer text-white p-2 rounded-lg w-full hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResendOtp;
