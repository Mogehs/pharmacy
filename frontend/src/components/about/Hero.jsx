import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 gap-8">
      {/* Left Side */}
      <div className="md:w-1/2">
        <button className="text-2xl text-[#00B8A9] font-bold mb-4">
          About
        </button>
        <h2 className="text-gray-500 leading-relaxed">
          But I must explain to you how all this mistaken idea of denouncing pleasure
          and praising pain was born and I will give you a complete account of the system,
          and expound the actual teachings of the great explorer of the truth, the master-builder of human.
        </h2>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-start md:justify-end items-start">
        <button
          onClick={() => navigate("/contact")}
          className=" text-white px-4 py-2 rounded-full hover:bg-[#009688] bg-[#00B8A9] transition mt-6 cursor-pointer"
          title="Contact"
        >
          Contact us
        </button>
      </div>
    </div>
  );
}
