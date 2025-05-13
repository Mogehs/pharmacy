import React, { useState } from "react";
import { motion } from "framer-motion";
import DeleteOrderConfirmation from "./DeleteOrderConfirmation";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "../features/ordersApi";

const statusOptions = ["Preparing Package", "Ready To Ship", "Delivered"];
const statusColors = {
  "Preparing Package": "bg-yellow-100 text-yellow-800",
  "Ready To Ship": "bg-red-100 text-red-800",
  Delivered: "bg-green-100 text-green-800",
};

const Orders = () => {
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder, { isLoading: isDeletingOrder }] =
    useDeleteOrderMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingStatusIds, setUpdatingStatusIds] = useState([]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingStatusIds((prev) => [...prev, id]);
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status. Please try again.");
    } finally {
      setUpdatingStatusIds((prev) => prev.filter((orderId) => orderId !== id));
    }
  };

  const handleDeleteConfirmation = (order) => {
    setSelectedOrder(order);
    setIsDeleting(true);
  };

  const filteredOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter(
      (order) =>
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg text-dark-color">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load orders. Try again later.
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 mt-6 w-[76vw] overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-dark-color tracking-wide">
        📦 Orders Management
      </h3>

      <input
        type="text"
        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gold-color"
        placeholder="🔍 Search by Order ID or Customer Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
            <tr>
              <th className="p-3 text-nowrap">Order ID</th>
              <th className="p-3 text-nowrap">Customer</th>
              <th className="p-3 text-nowrap">Shipping Address</th>
              <th className="p-3 text-nowrap">Date</th>
              <th className="p-3 text-nowrap">Total</th>
              <th className="p-3 text-nowrap">Status</th>
              <th className="p-3 text-nowrap">Payment</th>
              <th className="p-3 text-center text-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => {
                const isUpdating = updatingStatusIds.includes(order._id);
                return (
                  <tr
                    key={order._id}
                    className={`transition duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-3 py-3">{order._id}</td>
                    <td className="px-3 py-3">{order.user?.email || "N/A"}</td>
                    <td className="px-3 py-3">
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},
                      {order.shippingAddress.postalCode}
                    </td>
                    <td className="px-3 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`px-2 py-1 border rounded-md focus:outline-none ${
                          statusColors[order.status] || ""
                        }`}
                        disabled={isUpdating}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3 font-semibold">
                      <span
                        className={
                          order.isPaid ? "text-green-600" : "text-red-500"
                        }
                      >
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        disabled={isDeletingOrder}
                        onClick={() => handleDeleteConfirmation(order)}
                        className={`text-sm px-3 py-1 rounded-full text-white ${
                          isDeletingOrder
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {isDeletingOrder ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No matching orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isDeleting && selectedOrder && (
        <DeleteOrderConfirmation
          order={selectedOrder}
          onClose={() => setIsDeleting(false)}
          onDelete={async (id) => {
            try {
              await deleteOrder(id).unwrap();
              setIsDeleting(false);
            } catch (error) {
              console.error("Failed to delete order:", error);
              alert("Something went wrong. Order not deleted.");
            }
          }}
        />
      )}
    </motion.div>
  );
};

export default Orders;
