import React, { useState } from "react";
import {
  FaBook,
  FaCertificate,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaCreditCard,
  FaGooglePlay,
  FaLanguage,
  FaLayerGroup,
  FaLock,
  FaPlay,
  FaQuestionCircle,
  FaGoogleDrive,
} from "react-icons/fa";
const Overview = ({ course }) => {
  const [openLessons, setOpenLessons] = useState([]);
  const lessonCount = course?.lessons;
  const lessons = Array.from({ length: lessonCount }, (_, i) => i + 1);
  console.log(course);

  const toggleLesson = (index) => {
    setOpenLessons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      <div className="bg-gray-50 py-10 px-4 md:px-10 xl:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-4xl text-[#00B8A9] font-bold mb-4">
              Course Overview
            </h2>
            <p className="text-gray-600 text-lg mb-4">{course.description}</p>

            <h3 className="text-2xl text-[#00B8A9] font-semibold mb-3">
              What you'll learn in this course:
            </h3>
            <ul className="mb-4 space-y-2">
              {course.features?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-green-600 gap-2"
                >
                  <FaCheck />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 mb-8">
              {course.outcome ||
                "By the end of the course, you'll be equipped with everything you need to work confidently."}
            </p>

            {/* Lessons Section */}
            <h2 className="text-3xl text-[#00B8A9] font-semibold mb-4">
              Course Content
            </h2>
            <div className="mt-10 space-y-4">
              {lessons?.map((lesson, index) => {
                const isOpen = openLessons.includes(index);
                return (
                  <div
                    key={index}
                    className="bg-white shadow border border-gray-400 overflow-hidden"
                  >
                    <div
                      onClick={() => toggleLesson(index)}
                      className={`relative flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 pl-6 transition-all duration-300 border-gray-400 overflow-hidden ${
                        isOpen
                          ? "border-b border-opacity-100"
                          : "border-opacity-0"
                      }`}
                    >
                      <div
                        className={`absolute top-1/2  -translate-y-1/2 w-1.5 bg-[#009688] transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "left-0 h-16 opacity-100"
                            : "-left-10 h-0 opacity-0"
                        }`}
                      ></div>
                      <h3
                        className={`text-2xl font-medium transition-colors duration-300 ${
                          isOpen ? "text-[#00B8A9]" : "text-gray-700"
                        }`}
                      >
                        {lesson.title || `Lesson ${index + 1}`}
                      </h3>
                      <FaChevronDown
                        className={`transition-transform duration-300 transform ${
                          isOpen ? "rotate-180 text-[#009688]" : ""
                        }`}
                      />
                    </div>

                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 pb-4 pt-2 space-y-2">
                        <div className="flex justify-between items-center text-gray-800">
                          <div className="flex gap-2">
                            <span className="my-auto">
                              <FaGoogleDrive />
                            </span>
                            <span className="text-lg hover:text-[#00B8A9] duration-200 cursor-pointer">
                              {course.courseLink}
                            </span>
                          </div>
                          {course.price === 0 ? (
                            <></>
                          ) : (
                            <FaLock size={14} className="text-[#009688]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-16 ">
            <div className="text-3xl font-bold text-[#009688] mb-4">
              {course.price == 0 ? "Fasdas" : course.price}
            </div>
            <ul className=" text-gray-700 mb-6 divide-y divide-gray-200">
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaLayerGroup className="text-gray-700" />
                  <span className="font-medium">Course level:</span>
                </div>
                <span>High</span>
              </li>
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaClock className="text-gray-700" />
                  <span className="font-medium">Course Duration:</span>
                </div>
                <span>10 weeks</span>
              </li>
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaBook className="text-gray-700" />
                  <span className="font-medium">Lessons:</span>
                </div>
                <span>12</span>
              </li>
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaQuestionCircle className="text-gray-700" />
                  <span className="font-medium">Quizzes:</span>
                </div>
                <span>0</span>
              </li>
              <li className="flex items-center justify-between py-3 ">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCheck className="text-gray-700" />
                  <span className="font-medium">Pass Percentage:</span>
                </div>
                <span>80%</span>
              </li>
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCertificate className="text-gray-700" />
                  <span className="font-medium">Certificate:</span>
                </div>
                <span>Yes</span>
              </li>
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaLanguage className="text-gray-700" />
                  <span className="font-medium">Language:</span>
                </div>
                <span>English/Urdu</span>
              </li>
            </ul>
            {course.price === 0 ? (
              <></>
            ) : (
              <>
                <div className="mb-8 ">
                  <p className="text-lg text-[#00B8A9] font-semibold mb-4">
                    Secure Payment:
                  </p>
                  <div className="flex">
                    <img
                      src="/courses/card.png"
                      alt="Payment Methods"
                      className=""
                    />
                  </div>
                </div>
                <button
                  className=" bg-[#00B8A9] text-white py-4 px-7 rounded-md font-semibold transition duration-500
                            border-2 border-transparent hover:bg-[#009688] hover:border-[#009688] cursor-pointer"
                >
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
