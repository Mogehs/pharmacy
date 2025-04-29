import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 gap-8">
      {/* Left Side */}
      <div className="md:w-1/2">
        <button className="text-2xl text-[#00B8A9] font-bold mb-4">
          Online Courses
        </button>
        <h2 className="text-gray-500 leading-relaxed">
          500+ enrollments in 2 weeks, 90% satisfaction rate, $15,000 revenue, top-selling in category, global reach across 12 countries, average course completion rate: 78%, daily growth continues steadily.
        </h2>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-start md:justify-end items-start">
        <button
          onClick={() => navigate('/contact')}
          className=" text-white px-4 py-2 rounded-full hover:bg-[#009688] bg-[#00B8A9] transition mt-6 cursor-pointer"
          title="Contact"
        >
          Contact us
        </button>
      </div>
    </div>
  );
}
