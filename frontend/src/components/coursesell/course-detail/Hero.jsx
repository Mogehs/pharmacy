import React from 'react'
import { FaPlay, } from "react-icons/fa";


const Hero = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-[#f7f7fb] py-16 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    {/* Left Section */}
                    <div className="lg:mx-auto max-lg:px-6">
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-1">
                            <span>1. Home</span>
                            <span>&gt;</span>
                            <span>2. Course</span>
                            <span>&gt;</span>
                            <span className="text-black font-semibold">
                                3. Strategy law and Organization Foundation
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-3 mb-5">
                            <span className="bg-[#f59e0b] text-white text-xs px-3 py-1 rounded font-semibold cursor-pointer">Java</span>
                            <span className="bg-[#10b981] text-white text-xs px-3 py-1 rounded font-semibold cursor-pointer">Python</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-semibold text-[#0b0f29] leading-snug mb-6">
                            Strategy law and Organization <br /> Foundation
                        </h1>

                        {/* Description */}
                        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-xl">
                            The most impressive is collection of share me online college courses
                        </p>

                        {/* Info */}
                        <div className="flex items-center gap-3 text-base">
                            <img src="/courses/a.jpg" alt="Courselog" className="w-9 h-9 rounded-full object-cover" />
                            <span className="font-semibold text-black">Courselog</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">20 enrolled students</span>
                        </div>
                    </div>

                    {/* Right Section: Video Preview with Student Image */}
                    <div className="relative h-[480px]">
                        {/* Main Video Background */}
                        <div className="absolute right-0 lg:w-[90%] w-full h-full bg-gray-200  shadow-md overflow-hidden">
                            <img
                                src="/courses/c.png"
                                alt="Course thumbnail"
                                className="w-full h-full"
                            />
                        </div>

                        {/* Student Image Overlay */}
                        <div className="absolute lg:-left-10 md:left-18 max-md:left-3 bottom-15  w-[75%] max-md:w-[95%] h-[75%]">
                            <img
                                src="/courses/b.jpg"
                                alt="Student"
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />

                            {/* Play Button on Student Image */}
                            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 cursor-pointer rounded-full text-red-500 shadow-lg hover:scale-90 transition-transform duration-200">
                                <FaPlay className="ml-0.5 " size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero