import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const otpInputRefs = useRef([]);

    const handleSendOtp = () => {
        if (!email.includes("@")) {
            toast.error("Please enter a valid email.", { position: "top-center" });
            return;
        }

        // Simulate OTP sending
        toast.success("OTP sent successfully!", { position: "top-center" });
        setOtpSent(true);
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/[^0-9]/g, "").slice(-1);
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerifyOtp = () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 4) {
            toast.error("Please enter a valid 4-digit OTP.", { position: "top-center" });
            return;
        }

        // Simulate OTP verification
        toast.success("OTP verified!", { position: "top-center" });

        setTimeout(() => {
            navigate("/reset-password", { state: { email } });
        }, 1000);
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
                            Send OTP
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-center">Enter the OTP sent to your email</p>
                        <div className="flex justify-center space-x-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    ref={(el) => (otpInputRefs.current[index] = el)}
                                    className="w-12 h-12 border-2 border-blue-200 text-center rounded-lg focus:outline-none focus:border-blue-500 text-xl"
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            className="bg-blue-500 cursor-pointer text-white p-2 rounded-lg w-full hover:bg-blue-600 focus:outline-none"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
