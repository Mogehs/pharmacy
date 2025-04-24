import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';

const initialOrders = [
    { id: 'ORD001', customer: 'Amit Sharma', date: '2025-04-20', total: 85.5, status: 'Delivered' },
    { id: 'ORD002', customer: 'Ravi Kumar', date: '2025-04-21', total: 42.0, status: 'Pending' },
    { id: 'ORD003', customer: 'Priya Verma', date: '2025-04-22', total: 120.0, status: 'Cancelled' },
    { id: 'ORD004', customer: 'Neha Singh', date: '2025-04-23', total: 64.75, status: 'Shipped' },
];

const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const statusColor = {
    Delivered: 'text-green-600',
    Pending: 'text-yellow-500',
    Cancelled: 'text-red-500',
    Shipped: 'text-blue-500',
};

const Orders = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');

    const handleStatusChange = (id, newStatus) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this order?')) {
            setOrders(prev => prev.filter(order => order.id !== id));
        }
    };

    const filteredOrders = orders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            className="bg-white rounded-xl shadow-xl p-6 mt-6 max-w-full overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-dark-color tracking-wide">📦 Orders Management</h3>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-color transition"
                    placeholder="🔍 Search by Order ID or Customer Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
                <table className="w-full text-sm text-left table-auto">
                    <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
                        <tr>
                            <th className="p-3 text-nowrap">Order ID</th>
                            <th className="p-3 text-nowrap">Customer</th>
                            <th className="p-3 text-nowrap">Date</th>
                            <th className="p-3 text-nowrap">Total</th>
                            <th className="p-3 text-nowrap">Status</th>
                            <th className="p-3 text-center text-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className={`transition duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                                >
                                    <td className="px-3 py-3 text-nowrap">{order.id}</td>
                                    <td className="px-3 py-3 text-nowrap">{order.customer}</td>
                                    <td className="px-3 py-3 text-nowrap">{order.date}</td>
                                    <td className="px-3 py-3 font-medium text-dark-color">${order.total.toFixed(2)}</td>
                                    <td className="px-3 py-3">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`px-2 py-1 text-sm border rounded-md focus:outline-none ${statusColor[order.status]}`}
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-3 py-3 text-center">
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="text-sm px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 transition flex items-center justify-center gap-1"
                                        >
                                            <MdDelete className="text-lg" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-400 italic">
                                    No matching orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Orders;
