import React from "react";
import { FaUserFriends, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const userStats = [
    {
        icon: <FaUserFriends className="text-2xl text-blue-500" />,
        label: "Total Customers",
        value: 8920,
    },
    {
        icon: <FaUserCheck className="text-2xl text-green-500" />,
        label: "Active Users",
        value: 4573,
    },
    {
        icon: <FaUserPlus className="text-2xl text-purple-500" />,
        label: "New Signups",
        value: 112,
    },
];

const UserSummaryCard = () => {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className="text-lg font-semibold mb-4 text-[#00B8A9]">User Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {userStats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="flex items-center space-x-3 border rounded-md p-3 hover:shadow-lg transition"
                    >
                        <div>{stat.icon}</div>
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-lg font-bold text-dark-color">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default UserSummaryCard;
