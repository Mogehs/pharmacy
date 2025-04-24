import React, { useState } from "react";
import { motion } from "framer-motion";

const EditRoleOverlay = ({ customer, onClose, onSave }) => {
    const [newRole, setNewRole] = useState(customer.role);

    const handleSave = () => {
        onSave({ ...customer, role: newRole });
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-xl font-semibold mb-4">Edit Role for {customer.name}</h3>
                <div className="mb-4">
                    <label className="block text-sm">Role</label>
                    <select
                        className="w-full p-3 border rounded-md"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    >
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EditRoleOverlay;
