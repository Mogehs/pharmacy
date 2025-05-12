import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./features/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    try {
      const response = await loginUser(formData).unwrap();
      toast.success(response.message);
      dispatch(setUser(response.user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Login failed. Please try again.", {
        position: "top-center",
      });
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 flex flex-col p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Start your journey with us. Don’t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-blue-500 font-semibold cursor-pointer"
            >
              Sign up
            </Link>
          </p>

          <form onSubmit={handleLogin}>
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
              />
            </div>

            <div className="flex items-center justify-between my-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 font-medium cursor-pointer text-sm"
              >
                Forgot password?
              </Link>
              <Link
                to="/resend-otp"
                className="text-green-500 font-medium cursor-pointer text-sm"
              >
                Resend OTP
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 cursor-pointer rounded-lg mt-4 font-semibold hover:bg-blue-700 transition duration-300 shadow-md disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
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
                  Signing in...
                </span>
              ) : (
                "Sign in to your account"
              )}
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex md:items-center md:justify-end w-1/2 bg-gray-50">
          <img
            src="/login.jpg"
            alt="Login"
            className="w-[80%] object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
