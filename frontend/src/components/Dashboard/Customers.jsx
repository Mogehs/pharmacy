import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EditRoleOverlay from "./EditRoleOverlay";
import DeleteCustomerConfirmation from "./DeleteCustomerConfirmation";
import UserSummaryCard from "./UserSummaryCard";
import { useGetAllUsersQuery } from "../features/userApi";
import { ClipLoader } from "react-spinners";

const Customers = () => {
  const {
    data: customers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllUsersQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [customersList, setCustomersList] = useState([]);

  // Sync state with query data
  useEffect(() => {
    if (customers.length > 0) {
      setCustomersList(customers);
    }
  }, [customers]);

  // Filter customers by search term
  const filteredCustomers = customersList.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRole = (customer) => {
    setSelectedCustomer(customer);
    setIsEditingRole(true);
  };

  const handleDeleteCustomer = () => {
    setCustomersList((prev) =>
      prev.filter((customer) => customer._id !== selectedCustomer._id)
    );
    setIsDeleting(false);
  };

  const handleSaveRole = (updatedCustomer) => {
    setCustomersList((prev) =>
      prev.map((customer) =>
        customer.id === updatedCustomer._id ? updatedCustomer : customer
      )
    );
    setIsEditingRole(false);
  };

  return (
    <>
      <UserSummaryCard className="grid grid-cols-1 sm:grid-cols-3 gap-4" />

      <motion.div
        className="bg-white rounded-xl shadow-xl p-6 mt-6 max-w-full overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-dark-color tracking-wide">
          👥 Customer Management
        </h3>

        {/* Loading & Error States */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <ClipLoader size={35} color="#3B82F6" />
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center py-10">
            Error fetching customers.{" "}
            <button
              className="underline text-blue-600 hover:text-blue-800 ml-1"
              onClick={refetch}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
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
                        key={customer._id}
                        className={`transition duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                      >
                        <td className="px-3 py-2 text-nowrap">
                          {customer._id}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {customer.name}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {customer.email}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {customer.role}
                        </td>
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
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-400 italic"
                      >
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

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
