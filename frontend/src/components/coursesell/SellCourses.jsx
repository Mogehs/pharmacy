import React, { useState } from "react";
import { Link } from "react-router-dom"

const filters = [
  "All Category",
  "Clinical Pharmacy",
  "Chemistry",
  "Pharmacology",
  "Safety",
  "Research",
  "Hospital Practice",
  "Biopharmaceutics",
  "Pharmacy Law",
  "Toxicology",
  "Therapeutics",
  "Pharmacy Management",
  "Community Pharmacy"
];

const pharmacyCourses = [
  {
    id: 1,
    title: "Advanced Clinical Pharmacy Techniques",
    instructor: "Dr. Sarah Khan",
    image: "./courses/cr1.jpg",
    instructorImage: "./courses/dr1.jpg",
    price: "$45",
    label1: "Hot",
    label2: "New",
    students: "5623",
    category: "Clinical Pharmacy"
  },
  {
    id: 2,
    title: "Pharmaceutical Chemistry Basics",
    instructor: "Dr. Rai Hamza",
    image: "./courses/cr2.jpg",
    instructorImage: "./courses/dt1.jpg",
    price: "$30",
    label1: "New",
    label2: "Top",
    students: "4387",
    category: "Chemistry"
  },
  {
    id: 3,
    title: "Pharmacology for Beginners",
    instructor: "Dr. Ayesha Randhawa",
    image: "./courses/cr3.jpg",
    instructorImage: "./courses/dr2.jpg",
    price: "$35",
    label1: "Hot",
    label2: "Free",
    students: "2890",
    category: "Pharmacology"
  },
  {
    id: 4,
    title: "Drug Interactions & Safety",
    instructor: "Dr. Usman Tariq",
    image: "./courses/cr4.jpg",
    instructorImage: "./courses/dt2.jpg",
    price: "$40",
    label1: "Updated",
    label2: "Hot",
    students: "3502",
    category: "Safety"
  },
  {
    id: 5,
    title: "Clinical Trials & Research",
    instructor: "Dr. Areeba Rehman",
    image: "./courses/cr5.jpg",
    instructorImage: "./courses/dr3.jpg",
    price: "$50",
    label1: "Trending",
    label2: "Top",
    students: "3120",
    category: "Research"
  },
  {
    id: 6,
    title: "Hospital Pharmacy Practice",
    instructor: "Dr. Bilal Nawaz",
    image: "./courses/cr6.jpg",
    instructorImage: "./courses/dt3.jpg",
    price: "$38",
    label1: "New",
    label2: "Hot",
    students: "4233",
    category: "Hospital Practice"
  },
  {
    id: 7,
    title: "Essentials of Biopharmaceutics",
    instructor: "Dr. CH Tahseen",
    image: "./courses/cr7.jpg",
    instructorImage: "./courses/dt4.jpg",
    price: "$42",
    label1: "Hot",
    label2: "New",
    students: "2701",
    category: "Biopharmaceutics"
  },
  {
    id: 8,
    title: "Pharmacy Law & Ethics",
    instructor: "Dr. Sara zafar",
    image: "./courses/cr8.jpg",
    instructorImage: "./courses/dr4.jpg",
    price: "$29",
    label1: "Updated",
    label2: "Top",
    students: "1832",
    category: "Pharmacy Law"
  },
  {
    id: 9,
    title: "Introduction to Toxicology",
    instructor: "Dr. Waqas Abbas",
    image: "./courses/cr9.jpg",
    instructorImage: "./courses/dt5.jpg",
    price: "$34",
    label1: "New",
    label2: "Free",
    students: "2214",
    category: "Toxicology"
  },
  {
    id: 10,
    title: "Therapeutics and Drug Therapy",
    instructor: "Dr. Kinza Tariq",
    image: "./courses/cr10.jpg",
    instructorImage: "./courses/dr5.jpg",
    price: "$46",
    label1: "Trending",
    label2: "Hot",
    students: "3999",
    category: "Therapeutics"
  },
  {
    id: 11,
    title: "Pharmacy Business & Management",
    instructor: "Dr. Fakhar Abbas",
    image: "./courses/cr11.jpg",
    instructorImage: "./courses/dt6.jpg",
    price: "$55",
    label1: "Top",
    label2: "Hot",
    students: "2745",
    category: "Pharmacy Management"
  },
  {
    id: 12,
    title: "Community Pharmacy Essentials",
    instructor: "Dr. Kiran Rida",
    image: "./courses/cr12.jpg",
    instructorImage: "./courses/dr6.jpg",
    price: "$33",
    label1: "Hot",
    label2: "Free",
    students: "3699",
    category: "Community Pharmacy"
  }
];


export default function CourseGrid() {
  const [selectedFilter, setSelectedFilter] = useState("All Category");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const filteredCourses =
    selectedFilter === "All Category"
      ? pharmacyCourses
      : pharmacyCourses.filter(course => course.category === selectedFilter);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filteredCourses.length / cardsPerPage);

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-7">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-[#00B8A9] mb-4">
          Pick a Course to Get Started
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((filter, index) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={index}
              className={`text-sm font-semibold px-4 py-2 cursor-pointer rounded-full shadow-sm transition duration-300 border ${isActive
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {currentCourses.map((course, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-300 hover:shadow-lg transition"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded">
                  {course.label1}
                </span>
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {course.label2}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-bold w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow">
                {course.students}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-base font-bold text-[#00B8A9] leading-snug mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">by {course.instructor}</p>
              <p className="text-sm text-gray-500 mb-4">Price: {course.price}</p>

              <div className="flex items-center gap-2 mb-4">
                <img
                  src={course.instructorImage}
                  alt={course.instructor}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-800 font-medium">{course.instructor}</span>
              </div>

              <div className="flex items-center justify-between border-t pt-4 border-gray-200">
                <div className="flex gap-1 text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-[#00B8A9] text-sm font-semibold underline hover:text-[#009688]"
                >
                  Know details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2 flex-wrap">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`w-8 h-8 rounded-full text-sm font-bold transition cursor-pointer ${currentPage === idx + 1
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
