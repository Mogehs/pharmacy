import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple frontend validation (just for demonstration)
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields", { position: "top-center" });
            return;
        }

        setIsLoading(true);

        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Logged in (demo mode)", { position: "top-center" });
            navigate("/"); // redirect to home
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">

                {/* Left Side - Login Form */}
                <div className="w-full md:w-1/2 flex flex-col p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h2>
                    <p className="text-gray-600 text-sm text-center mb-6">
                        Start your journey with us. Don’t have an account?{" "}
                        <Link to="/sign-up" className="text-blue-500 font-semibold cursor-pointer">Sign up</Link>
                    </p>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between my-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-gray-600 text-sm">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="text-blue-500 font-medium cursor-pointer text-sm">Forgot password?</Link>
                    </div>

                    <button
                        className="w-full bg-blue-600 text-white p-3 cursor-pointer rounded-lg mt-4 font-semibold hover:bg-blue-700 transition duration-300 shadow-md disabled:opacity-50"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in to your account"}
                    </button>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center">
                    <img src="" alt="Login" className="w-[80%] object-cover rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
}
