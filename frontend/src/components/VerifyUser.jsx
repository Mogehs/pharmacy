import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyOTPMutation } from "./features/userApi";

const VerifyUser = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [userVerifyOtp, { isLoading }] = useVerifyOTPMutation();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      toast.error("Please enter a valid 6-digit OTP.", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await userVerifyOtp({
        id: userId,
        otp: otpCode,
      }).unwrap();
      toast.success(response.message || "OTP Verified Successfully!", {
        position: "top-center",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error?.data?.message || "Invalid or expired OTP.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          OTP Verification
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center gap-2 flex-wrap">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                disabled={isLoading}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white py-3 rounded-md text-lg transition duration-300 hover:bg-blue-700 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
