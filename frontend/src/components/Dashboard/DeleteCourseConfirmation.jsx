import React from "react";
import { motion } from "framer-motion";

const DeleteCourseConfirmation = ({ course, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
            <motion.div
                className="bg-white p-6 rounded-xl w-[90%] md:w-full max-w-md shadow-xl text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-semibold mb-4">⚠️ Delete Course</h2>
                <p className="mb-4">Are you sure you want to delete <strong>{course.title}</strong>?</p>
                <div className="flex justify-center space-x-4">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={() => onDelete(course.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteCourseConfirmation;
