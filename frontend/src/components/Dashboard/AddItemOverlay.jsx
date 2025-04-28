import React, { useState } from "react";
import { motion } from "framer-motion";

const AddItemOverlay = ({ onClose, onAdd, title = "Add New Item", fields = [] }) => {
    const initialFormState = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
            >
                <h2 className="text-lg font-semibold text-dark-color mb-4">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-600">
                                {field.label}
                            </label>
                            <input
                                type={field.type || "text"}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
                                required
                            />
                        </div>
                    ))}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#a8754d] text-white rounded hover:bg-[#92613e]"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddItemOverlay;
