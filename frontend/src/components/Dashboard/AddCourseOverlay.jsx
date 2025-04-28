import React, { useState } from "react";
import { motion } from "framer-motion";

const AddCourseOverlay = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        category: "",
        price: "",
        seats: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        if (!formData.id || !formData.title || !formData.category) return;
        onAdd({
            ...formData,
            price: parseFloat(formData.price) || 0,
            seats: parseInt(formData.seats) || 0,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
            <motion.div
                className="bg-white p-6 rounded-xl w-[90%] md:w-full max-w-md shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-semibold mb-4">➕ Add New Course</h2>
                <div className="space-y-3">
                    <input name="id" placeholder="Course ID" onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="title" placeholder="Course Title" onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="category" placeholder="Category" onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="price" placeholder="Price" type="number" onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="seats" placeholder="Number of Seats" type="number" onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="bg-[#a8754d] text-white px-4 py-2 rounded hover:bg-[#b8754d]">Add</button>
                </div>
            </motion.div>
        </div>
    );
};

export default AddCourseOverlay;
