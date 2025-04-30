import React, { useState } from "react";
import { motion } from "framer-motion";
import AddCourseOverlay from "./AddCourseOverlay";
import EditCourseOverlay from "./EditCourseOverlay";
import DeleteCourseConfirmation from "./DeleteCourseConfirmation";

const initialCourses = [
    { id: "C001", title: "React for Beginners", category: "Web Development", price: 49.99, seats: 10 },
    { id: "C002", title: "Python Basics", category: "Programming", price: 39.99, seats: 8 },
    { id: "C003", title: "UI/UX Design", category: "Design", price: 59.99, seats: 12 },
];

const Courses = () => {
    const [courses, setCourses] = useState(initialCourses);
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

    const handleDeleteCourse = (id) => {
        setCourses((prev) => prev.filter((course) => course.id !== id));
        setIsDeleting(false);
    };

    const handleAddCourse = (newCourse) => {
        setCourses((prev) => [newCourse, ...prev]);
        setIsAdding(false);
    };

    const handleSaveCourse = (updatedCourse) => {
        setCourses((prev) =>
            prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
        );
        setIsEditing(false);
    };

    return (
        <motion.div
            className="bg-white rounded-xl shadow-xl p-6 mt-6 max-w-full overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-[18px] md:text-2xl font-bold mb-6 text-[#00B8A9] tracking-wide">
                    📘 Course Management
                </h3>
                <motion.button
                    onClick={() => setIsAdding(true)}
                    whileHover={{
                        scale: 1.08,
                        backgroundColor: "#009688",
                        color: "#fff",
                        borderColor: "#009688",
                        boxShadow: "0px 0px 12px rgba(168, 117, 77, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="px-4 text-sm py-1 cursor-pointer border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full"
                >
                    ➕ Add New Course
                </motion.button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-color transition"
                    placeholder="🔍 Search courses by title, id or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
                <table className="w-full text-sm text-left table-auto">
                    <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
                        <tr>
                            <th className="p-3 text-nowrap">Course ID</th>
                            <th className="p-3 text-nowrap">Title</th>
                            <th className="p-3 text-nowrap">Category</th>
                            <th className="p-3 text-nowrap">Price</th>
                            <th className="p-3 text-nowrap">Seats</th>
                            <th className="p-3 text-center text-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, index) => (
                                <tr
                                    key={course.id}
                                    className={`transition duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100`}
                                >
                                    <td className="px-3 py-2 text-nowrap">{course.id}</td>
                                    <td className="px-3 py-2 text-nowrap">{course.title}</td>
                                    <td className="px-3 py-2 text-nowrap">{course.category}</td>
                                    <td className="px-3 py-2 text-nowrap">
                                        ${Number(course.price).toFixed(2)}
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">{course.seats}</td>
                                    <td className="flex items-center px-3 py-2 text-center space-x-2">
                                        <button
                                            onClick={() => handleEditCourse(course)}
                                            className="text-sm px-6 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setIsDeleting(true);
                                            }}
                                            className="text-sm px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-400 italic">
                                    No courses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isAdding && (
                <AddCourseOverlay onClose={() => setIsAdding(false)} onAdd={handleAddCourse} />
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
