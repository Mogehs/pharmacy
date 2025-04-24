import React from "react";
import { motion } from "framer-motion";
import { MdAttachMoney, MdShoppingCart, MdInventory, MdWarning } from "react-icons/md";

const stats = [
    {
        title: "Total Sales",
        value: "$12,430",
        icon: <MdAttachMoney className="text-3xl text-green-500" />,
        color: "bg-green-100",
    },
    {
        title: "Total Orders",
        value: "1,243",
        icon: <MdShoppingCart className="text-3xl text-blue-500" />,
        color: "bg-blue-100",
    },
    {
        title: "In Stock",
        value: "308 Products",
        icon: <MdInventory className="text-3xl text-purple-500" />,
        color: "bg-purple-100",
    },
    {
        title: "Low Stock",
        value: "12 Alerts",
        icon: <MdWarning className="text-3xl text-red-500" />,
        color: "bg-red-100",
    },
];

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    className={`p-5 rounded-lg shadow-md flex items-center gap-4 ${stat.color}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="p-3 rounded-full bg-white shadow-md">
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <h3 className="text-xl font-bold text-dark-color">{stat.value}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default DashboardStats;
