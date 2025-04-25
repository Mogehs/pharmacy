import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    MdDashboard,
    MdInventory,
    MdPeople,
    MdSettings,
    MdBorderStyle,
    MdMenu,
    MdClose
} from 'react-icons/md';
import { FaDiscourse } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
        { to: '/dashboard/products', label: 'Products', icon: <MdInventory /> },
        { to: '/dashboard/customers', label: 'Customers', icon: <MdPeople /> },
        { to: '/dashboard/orders', label: 'Orders', icon: <MdBorderStyle /> },
        { to: '/dashboard/courses', label: 'Courses', icon: <FaDiscourse /> },
        // { to: '/settings', label: 'Settings', icon: <MdSettings /> },
    ];

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden fixed top-3 left-2 z-25">
                <button
                    className="text-[#dbdad9] bg-[#454142] p-2 rounded-md shadow-lg"
                    onClick={() => setIsOpen(true)}
                >
                    <MdMenu size={24} />
                </button>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 h-screen bg-dk text-white p-5 fixed left-0 top-0 shadow-lg z-20">
                <h1 className="text-2xl font-bold mb-10 font-Fredoka">Pharma Admin</h1>
                <nav className="space-y-4">
                    {links.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded hover:bg-medium-color transition ${isActive ? 'bg-medium-color' : ''
                                }`
                            }
                        >
                            {icon} {label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Mobile Slide-in Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 h-full w-4/5 bg-dk text-white p-5 shadow-lg z-50 md:hidden"
                    >
                        {/* Cross Close Button */}
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white mt-16 hover:text-red-400 transition"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        <h1 className="text-2xl font-bold mb-10 font-Fredoka">Pharma Admin</h1>
                        <nav className="space-y-4">
                            {links.map(({ to, label, icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    onClick={handleLinkClick}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded hover:bg-medium-color transition ${isActive ? 'bg-medium-color' : ''
                                        }`
                                    }
                                >
                                    {icon} {label}
                                </NavLink>
                            ))}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
