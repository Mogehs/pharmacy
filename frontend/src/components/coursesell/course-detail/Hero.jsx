import React from 'react'
import { FaPlay, } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Hero = ({ course }) => {
    console.log(course.title.split(',')[0])
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-[#f7f7fb] py-16 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

                    {/* Left Section */}
                    <div className="lg:mx-auto max-lg:px-6">
                        {/* Breadcrumbs */}
                        <div className="text-sm text-gray-500 mb-6 flex flex-wrap items-center gap-1">
                            <span>
                                <Link to="/" className="hover:text-[#009688] transition-colors duration-200 text-black">Home</Link>
                            </span>
                            <span>&gt;</span>
                            <span>
                                <Link to="/courses" className="hover:text-[#009688] transition-colors duration-200 text-[#00B8A9]">Course</Link>
                            </span>
                            <span>&gt;</span>

                            <span className="text-[#009688] font-semibold ">
                                {course.title.split(',')[0]}
                                {" "}
                                {course.title.split(',')[1]}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 mb-5">
                            <span className="bg-[#00B8A9] text-white text-xs px-3 py-1 rounded font-semibold ">{course.label1}</span>
                            <span className="bg-[#10b981] text-white text-xs px-3 py-1 rounded font-semibold ">{course.label2}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-semibold text-[#00B8A9] leading-snug mb-6">
                            {course.title.split(',')[0]}
                            <span className="inline lg:hidden"> </span>
                            <span className="hidden lg:inline"><br /></span>
                            {course.title.split(',')[1]}
                        </h1>

                        {/* Description */}
                        <p className="text-gray-700 text-base leading-relaxed mb-8 max-w-xl">
                            {course.description.split(" ").slice(0, 15).join(" ")}...
                        </p>

                        {/* Info */}
                        <div className="flex items-center gap-3 text-base">
                            <img src={course.instructorImage} alt="Courselog" className="w-12 h-12 rounded-full object-cover" />
                            <span className="font-semibold text-[#00B8A9]">{course.instructor}</span>
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
                                src={course.image}
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