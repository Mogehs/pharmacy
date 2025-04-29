import React, { useState } from "react";
import { motion } from "framer-motion";

const EditCourseOverlay = ({ course, onClose, onSave }) => {
    const [formData, setFormData] = useState(course);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        onSave({
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
                <h2 className="text-xl text-[#00B8A9] font-semibold mb-4">✏️ Edit Course</h2>
                <div className="space-y-3">
                    <input name="id" placeholder="Course ID" value={formData.id} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" />
                    <input name="seats" type="number" placeholder="Number of seats" value={formData.seats} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="bg-[#00B8A9] text-white px-4 py-2 rounded hover:bg-[#009688]">Save</button>
                </div>
            </motion.div>
        </div>
    );
};

export default EditCourseOverlay;
