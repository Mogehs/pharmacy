import React from "react";
import { motion } from "framer-motion";

const DeleteStudentConfirmation = ({ student, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                className="bg-white rounded-xl shadow-lg p-6 w-[90%] md:w-[400px]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                <h2 className="text-xl font-semibold text-red-600 mb-4">⚠️ Confirm Deletion</h2>
                <p className="mb-4">
                    Are you sure you want to delete admission record for{" "}
                    <span className="font-bold">{student.name}</span>?
                </p>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default DeleteStudentConfirmation;
