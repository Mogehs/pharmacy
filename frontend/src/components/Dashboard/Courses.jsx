import React, { useState } from "react";
import { motion } from "framer-motion";
import AddCourseOverlay from "./AddCourseOverlay";
import EditCourseOverlay from "./EditCourseOverlay";
import DeleteCourseConfirmation from "./DeleteCourseConfirmation";
import {
  useGetCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "../features/courseApi";

const Courses = () => {
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery();
  const [addCourse] = useAddCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditing(true);
  };

  const handleDeleteCourse = async (id) => {
    await deleteCourse(id);
    setIsDeleting(false);
  };

  const handleAddCourse = async (newCourse) => {
    await addCourse(newCourse);
    setIsAdding(false);
  };

  const handleSaveCourse = async (updatedCourse) => {
    await updateCourse(updatedCourse);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 mt-6 max-w-[962px] overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between mb-4 items-center gap-4">
        <h3 className="text-[18px] md:text-2xl font-bold text-[#00B8A9] tracking-wide">
          📘 Course Management
        </h3>
        <motion.button
          onClick={() => setIsAdding(true)}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#00796B",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="px-5 py-2 text-sm font-medium rounded-full bg-[#00B8A9] text-white shadow hover:shadow-md focus:outline-none"
        >
          ➕ Add New Course
        </motion.button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00B8A9] transition"
          placeholder="🔍 Search courses by title, ID or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
            <tr>
              <th className="p-3 text-nowrap">Cover</th>
              <th className="p-3 text-nowrap">Title</th>
              <th className="p-3 text-nowrap">Instructor</th>
              <th className="p-3 text-nowrap">Duration</th>
              <th className="p-3 text-nowrap">Level</th>
              <th className="p-3 text-nowrap">Language</th>
              <th className="p-3 text-nowrap">Lessons</th>
              <th className="p-3 text-nowrap">Quizzes</th>
              <th className="p-3 text-nowrap">Price</th>
              <th className="p-3 text-nowrap">Free?</th>
              <th className="p-3 text-center text-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="11" className="text-center py-6 text-gray-400">
                  Loading courses...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="11" className="text-center py-6 text-red-400">
                  Failed to fetch courses.
                </td>
              </tr>
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <tr
                  key={course.id}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-3 py-2 text-nowrap">
                    <img
                      src={course.coverImage}
                      alt="coverImg"
                      className="w-20 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-3 py-2 text-nowrap">{course.title}</td>
                  <td className="px-3 py-2 text-nowrap">{course.instructor}</td>
                  <td className="px-3 py-2 text-nowrap">
                    {course.courseDuration} hrs
                  </td>
                  <td className="px-3 py-2 text-nowrap">
                    {course.courseLevel}
                  </td>
                  <td className="px-3 py-2 text-nowrap">{course.language}</td>
                  <td className="px-3 py-2 text-nowrap">{course.lessons}</td>
                  <td className="px-3 py-2 text-nowrap">{course.quizes}</td>
                  <td className="px-3 py-2 text-nowrap">
                    ${Number(course.price).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-nowrap">
                    {course.isFree ? "Yes" : "No"}
                  </td>
                  <td className="flex items-center px-3 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="text-sm px-4 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsDeleting(true);
                      }}
                      className="text-sm px-4 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Overlays */}
      {isAdding && (
        <AddCourseOverlay
          onClose={() => setIsAdding(false)}
          onAdd={handleAddCourse}
        />
      )}
      {isEditing && selectedCourse && (
        <EditCourseOverlay
          course={selectedCourse}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveCourse}
        />
      )}
      {isDeleting && selectedCourse && (
        <DeleteCourseConfirmation
          course={selectedCourse}
          onClose={() => setIsDeleting(false)}
          onDelete={() => handleDeleteCourse(selectedCourse.id)}
        />
      )}
    </motion.div>
  );
};

export default Courses;
