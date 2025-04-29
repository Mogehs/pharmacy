import React, { useState } from "react";
import { motion } from "framer-motion";
import EditRoleOverlay from "./EditRoleOverlay"; // This will handle the role update
import DeleteCustomerConfirmation from "./DeleteCustomerConfirmation"; // This will handle customer deletion
import UserSummaryCard from "./UserSummaryCard";

const customers = [
    { id: "C001", name: "John Doe", email: "johndoe@example.com", role: "Admin" },
    { id: "C002", name: "Jane Smith", email: "janesmith@example.com", role: "Customer" },
    { id: "C003", name: "Robert Brown", email: "robertbrown@example.com", role: "Customer" },
    { id: "C004", name: "Alice Johnson", email: "alicejohnson@example.com", role: "Customer" },
];

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [customersList, setCustomersList] = useState(customers);

    // Filter customers by search term
    const filteredCustomers = customersList.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditRole = (customer) => {
        setSelectedCustomer(customer);
        setIsEditingRole(true);
    };

    const handleDeleteCustomer = () => {
        setCustomersList((prev) => prev.filter((customer) => customer.id !== selectedCustomer.id));
        setIsDeleting(false);
    };

    const handleSaveRole = (updatedCustomer) => {
        setCustomersList((prev) =>
            prev.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
        setIsEditingRole(false);
    };

    return (
        <>
            <UserSummaryCard />
            <motion.div
                className="bg-white rounded-xl shadow-xl p-6 mt-6 max-w-full overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-[#00B8A9] tracking-wide">
                    👥 Customer Management
                </h3>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-color transition"
                        placeholder="🔍 Search customers by name, id or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Customer Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
                    <table className="w-full text-sm text-left table-auto">
                        <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
                            <tr>
                                <th className="p-3 text-nowrap">Customer ID</th>
                                <th className="p-3 text-nowrap">Name</th>
                                <th className="p-3 text-nowrap">Email</th>
                                <th className="p-3 text-nowrap">Role</th>
                                <th className="p-3 text-center text-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer, index) => (
                                    <tr
                                        key={customer.id}
                                        className={`transition duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100`}
                                    >
                                        <td className="px-3 py-2 text-nowrap">{customer.id}</td>
                                        <td className="px-3 py-2 text-nowrap">{customer.name}</td>
                                        <td className="px-3 py-2 text-nowrap">{customer.email}</td>
                                        <td className="px-3 py-2 text-nowrap">{customer.role}</td>
                                        <td className="flex items-center px-3 py-2 text-center space-x-2">
                                            <button
                                                onClick={() => handleEditRole(customer)}
                                                className="text-sm px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition text-nowrap"
                                            >
                                                Edit Role
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedCustomer(customer);
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
                                    <td colSpan="5" className="text-center py-6 text-gray-400 italic">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modals */}
                {isEditingRole && selectedCustomer && (
                    <EditRoleOverlay
                        customer={selectedCustomer}
                        onClose={() => setIsEditingRole(false)}
                        onSave={handleSaveRole}
                    />
                )}

                {isDeleting && selectedCustomer && (
                    <DeleteCustomerConfirmation
                        customer={selectedCustomer}
                        onClose={() => setIsDeleting(false)}
                        onDelete={handleDeleteCustomer}
                    />
                )}
            </motion.div>
        </>
    );
};

export default Customers;