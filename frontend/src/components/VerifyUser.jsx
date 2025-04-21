import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyUser = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const location = useLocation();
    const user = location?.state?.user || {};
    const email = user.email || "example@mail.com";

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
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length < 4) {
            toast.error("Please enter a valid 4-digit OTP.", { position: "top-center" });
            return;
        }

        toast.success("OTP Verified Successfully!", { position: "top-center" });

        setTimeout(() => {
            navigate("/"); // Simulate redirect
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">OTP Verification</h1>
                <p className="text-gray-600 text-center mb-6">
                    Enter the OTP sent to <strong>{email}</strong>
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-14 h-14 border rounded-md text-center text-xl focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded-md text-lg transition duration-300 hover:bg-blue-700"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyUser;
