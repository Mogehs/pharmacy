import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rememberMe: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle Form Submission (frontend only)
    const handleRegister = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill out all required fields", { position: "top-center" });
            return;
        }

        setIsLoading(true);

        // Simulate a delay and successful registration
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Registered successfully (demo mode)", { position: "top-center" });
            navigate('/user-verification', { state: { user: formData } });
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Left Side */}
                <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center">
                    <img
                        src=""
                        alt="Signup"
                        className="w-[80%] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Side */}
                <form className="w-full md:w-1/2 flex flex-col p-8" onSubmit={handleRegister}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                        Create an Account
                    </h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between my-4">
                        <div className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="remember"
                                className="mr-2 cursor-pointer"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="remember"
                                className="text-gray-600 cursor-pointer text-sm"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link to="/login" className="text-blue-500 font-medium cursor-pointer text-sm">Already Account?</Link>
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white p-3 rounded-lg mt-4 font-semibold hover:bg-blue-700 transition duration-300 shadow-md ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>
            </div>
        </div>
    );
}
