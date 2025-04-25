import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddProductOverlay = ({ onClose, onAdd }) => {
    const [newProduct, setNewProduct] = useState({
        id: "",
        title: "",
        category: "",
        price: "",
        stock: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (newProduct.id && newProduct.title && newProduct.category) {
            onAdd({
                ...newProduct,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock),
            });
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-full max-w-md"
                    initial={{ scale: 0.8, y: -50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-dark-color">
                        ➕ Add New Product
                    </h2>

                    <div className="space-y-4">
                        {["id", "title", "category", "price", "stock"].map((field) => (
                            <input
                                key={field}
                                type={field === "price" || field === "stock" ? "number" : "text"}
                                name={field}
                                value={newProduct[field]}
                                onChange={handleChange}
                                required
                                placeholder={`Enter ${field}`}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color"
                            />
                        ))}
                    </div>

                    <div className="flex justify-end mt-6 space-x-3">
                        <button
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#a8754d] text-white px-4 py-2 rounded hover:bg-[#b8754d] hover:cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Add Product
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddProductOverlay;
