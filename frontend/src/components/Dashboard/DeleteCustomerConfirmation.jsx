import React from "react";
import { motion } from "framer-motion";

const DeleteCustomerConfirmation = ({ customer, onClose, onDelete }) => {
    if (!customer) return null;

    return (
        <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-xl font-semibold mb-4">Delete Customer</h3>
                <p className="mb-4 text-sm">Are you sure you want to delete customer "{customer.name}"?</p>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DeleteCustomerConfirmation;
