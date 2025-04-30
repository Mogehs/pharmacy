import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed Email:", email);
    alert("Thank you for subscribing!");
    setEmail(""); // Reset email input
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-500 to-blue-400 py-20 px-6  lg:px-20 w-full mx-auto  flex lg:flex-row flex-col lg:gap-y-8 md:gap-y-5 items-center justify-evenly text-white overflow-hidden">
      {/* Background Blur Image */}
      <div className="absolute inset-0">
        <img
          src="/courses/d.png" // your image path
          alt="Background Blur"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Text */}
      <div className="relative z-10 mb-8 md:mb-0 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl text-[#fff] font-bold leading-tight">
          Want Us to Email you About <br className="hidden md:block" />
          Special Offers & Updates?
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex bg-white rounded-full overflow-hidden shadow-lg "
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-6 py-4 outline-none text-gray-700 w-64 max-md:w-50   placeholder-gray-400 text-base"
        />
        <button
          type="submit"
          className="bg-[#00B8A9] hover:bg-[#009688] text-white px-6 flex items-center justify-center text-lg font-semibold transition-all duration-300 hover:cursor-pointer"
        >
          Subscribe <FiArrowRight className="ml-2" />
        </button>
      </form>
    </div>
  );
}
