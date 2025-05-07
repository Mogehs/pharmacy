import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "./features/userApi";

export default function RegisterPage() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill out all required fields", {
        position: "top-center",
      });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      toast.success(response.message);
      return navigate(`/user-verification/${response.userId}`);
    } catch (error) {
      return toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex h-fit items-center justify-center p-7">
      <div className="flex flex-col sm:h-[33rem] md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="hidden md:flex w-[60%] bg-gray-50 items-center justify-start ">
          <img
            src="/login.jpg"
            alt="Signup"
            className="w-[80%] object-cover shadow-lg"
          />
        </div>

        <form
          className="w-full md:w-1/2 flex flex-col p-8"
          onSubmit={handleRegister}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
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

          <div className="mb-2">
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

          <div className="flex items-center justify-between mb-10">
            <Link
              to="/login"
              className="text-blue-500 font-medium cursor-pointer text-sm"
            >
              Already have an Account?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white p-3 rounded-lg mt-4 font-semibold hover:bg-blue-700 transition duration-300 shadow-md ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
