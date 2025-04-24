import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AdminLayout = () => {
    return (
        <div className="flex bg-light-color min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 w-full">
                {/* Topbar stays static above */}
                <Topbar />

                {/* Animated page content */}
                <motion.div
                    className="p-2 md:p-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Outlet />
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLayout;

