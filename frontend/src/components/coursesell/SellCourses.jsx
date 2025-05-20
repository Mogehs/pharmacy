import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../features/courseApi";
import { useSelector } from "react-redux";

export default function CourseGrid() {
  const { user } = useSelector((state) => state.user);

  const purchasedCourseIds = user?.purchasedCourses || [];
  const filters = ["All Courses", "Purchased Courses"];

  const [selectedFilter, setSelectedFilter] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Search state
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const { data: pharmacyCourses = [] } = useGetCoursesQuery();

  // 🔎 Filter courses
  const filteredByType =
    selectedFilter === "All Courses"
      ? pharmacyCourses
      : pharmacyCourses.filter((course) =>
          purchasedCourseIds.includes(course._id)
        );

  const filteredCourses = filteredByType.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const totalPages = Math.ceil(filteredCourses.length / cardsPerPage);

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-7">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-[#00B8A9] mb-4">
          Pick a Course to Get Started
        </h2>
      </div>

      {/* 🔘 Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {filters.map((filter, index) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={index}
              className={`text-sm font-semibold px-4 py-2 cursor-pointer rounded-full shadow-sm transition duration-300 border ${
                isActive
                  ? "bg-[#00B8A9] text-white hover:bg-[#009688]"
                  : "text-[#00B8A9] hover:text-white hover:bg-[#009688]"
              }`}
              onClick={() => {
                setSelectedFilter(filter);
                setCurrentPage(1);
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* 🔍 Search Bar */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset pagination on search
          }}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
        />
      </div>

      {/* 📚 Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {currentCourses.map((course, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={course.coverImage}
                alt={course.title}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded">
                  Price: {course.price}$
                </span>
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Lessons: {course.lessons}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold p-1 flex items-center justify-center rounded-md shadow">
                {course.courseLevel}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-base font-bold text-[#00B8A9] leading-snug mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                by {course.instructor}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Price: {course.price} $
              </p>

              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/default.jpg"
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-800 font-medium">
                  {course.instructor}
                </span>
              </div>

              <div className="flex items-center justify-between border-t pt-4 border-gray-200">
                <div className="flex gap-1 text-yellow-400 text-lg">
                  ⭐⭐⭐⭐⭐
                </div>
                <Link
                  to={`/courses/${course._id}`}
                  className="text-[#00B8A9] text-sm font-semibold underline hover:text-[#009688]"
                >
                  Know details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ⏩ Pagination */}
      <div className="flex justify-center mt-10 space-x-2 flex-wrap">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`w-8 h-8 rounded-full text-sm font-bold transition cursor-pointer ${
              currentPage === idx + 1
                ? "bg-[#00B8A9] border border-[#00B8A9] text-white hover:bg-[#009688]"
                : "text-[#00B8A9] border border-[#00B8A9] hover:bg-[#009688] hover:text-white"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
