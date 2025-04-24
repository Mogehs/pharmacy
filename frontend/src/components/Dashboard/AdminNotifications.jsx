import React from "react";
import { motion } from "framer-motion";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdInventory2, MdMessage, MdErrorOutline } from "react-icons/md";

const notifications = [
    {
        id: 1,
        icon: <MdInventory2 className="text-blue-500 text-xl" />,
        message: "New stock of Vitamin C has arrived.",
        time: "5 minutes ago",
    },
    {
        id: 2,
        icon: <MdMessage className="text-green-500 text-xl" />,
        message: "New message from customer: 'Need delivery update.'",
        time: "15 minutes ago",
    },
    {
        id: 3,
        icon: <MdErrorOutline className="text-red-500 text-xl" />,
        message: "Low stock alert: Blood Pressure Monitor",
        time: "1 hour ago",
    },
];

const AdminNotifications = () => {
    return (
        <motion.div
            className="bg-white p-5 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex items-center mb-4">
                <IoMdNotificationsOutline className="text-dark-color text-xl mr-2" />
                <h3 className="text-lg font-semibold text-dark-color">Admin Notifications</h3>
            </div>
            <ul className="space-y-4">
                {notifications.map((note) => (
                    <li key={note.id} className="flex items-start space-x-3 text-sm">
                        <div>{note.icon}</div>
                        <div className="flex-1">
                            <p className="text-dark-color font-medium">{note.message}</p>
                            <p className="text-xs text-gray-400">{note.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default AdminNotifications;
