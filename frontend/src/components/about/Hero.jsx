import React from 'react';

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 gap-8">
      {/* Left Side */}
      <div className="md:w-1/2">
        <button className="text-2xl text-gray-700 font-bold mb-4">
          About
        </button>
        <h2 className="text-gray-600 leading-relaxed">
          But I must explain to you how all this mistaken idea of denouncing pleasure
          and praising pain was born and I will give you a complete account of the system,
          and expound the actual teachings of the great explorer of the truth, the master-builder of human.
        </h2>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-start md:justify-end items-start">
        <button
          className="bg-[#15A9E3] text-white px-4 py-2 rounded-full hover:bg-[#7fc4dfd8] transition mt-6 cursor-pointer"
          title="Contact"
        >
          Contact us
        </button>
      </div>
    </div>
  );
}
