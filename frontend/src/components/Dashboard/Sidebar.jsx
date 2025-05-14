import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdPeople,
  MdBorderStyle,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { FaDiscourse } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
    {
      to: "/dashboard/appointments",
      label: "Appointments",
      icon: <FaPeopleGroup />,
    },
    { to: "/dashboard/orders", label: "Orders", icon: <MdBorderStyle /> },
    { to: "/dashboard/products", label: "Products", icon: <MdInventory /> },
    { to: "/dashboard/courses", label: "Courses", icon: <FaDiscourse /> },
    {
      to: "/dashboard/add-videos",
      label: "YouTube Videos",
      icon: <CiYoutube />,
    },
    // { to: "/dashboard/students", label: "Students", icon: <PiStudent /> },
    { to: "/dashboard/customers", label: "Customers", icon: <MdPeople /> },
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
          className="text-[#00B8A9] bg-[#454142] p-2 rounded-md shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MdMenu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 h-full bg-dk text-white px-5 py-2 fixed left-0 top-0 shadow-lg z-20 overflow-auto">
        <div>
          <h1 className="text-2xl text-[#00B8A9] font-bold mb-10 font-Fredoka">
            Pharma Admin
          </h1>
          <nav className="space-y-4">
            {links.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-1 rounded hover:bg-medium-color transition ${
                    isActive ? "bg-[#00B8A9] border-l-4 border-[#009688]" : ""
                  }`
                }
              >
                {icon} {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Home link at the bottom */}
        <div className="pt-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded hover:bg-medium-color transition ${
                isActive ? "bg-blue-600 border-l-4 border-yellow-400" : ""
              }`
            }
          >
            <MdDashboard /> Home
          </NavLink>
        </div>
      </aside>

      {/* Mobile Slide-in Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full overflow-auto w-full bg-dk text-white p-5 shadow-lg z-50 md:hidden flex flex-col justify-between"
          >
            {/* Cross Close Button */}
            <div className="fixed top-2 right-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[#009688] transition"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div>
              <h1 className="fixed top-2 text-2xl text-[#00B8A9] px-4 rounded-md bg-gray-900 font-bold font-Fredoka h-12">
                Pharma Admin
              </h1>
              <nav className="space-y-4 mt-10">
                {links.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/dashboard"}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded hover:bg-medium-color transition ${
                        isActive
                          ? "bg-[#00B8A9] border-l-4 border-[#009688]"
                          : ""
                      }`
                    }
                  >
                    {icon} {label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Home link at bottom */}
            <div className="pt-2">
              <NavLink
                to="/"
                end
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded hover:bg-medium-color transition ${
                    isActive ? "bg-blue-600 border-l-4 border-yellow-400" : ""
                  }`
                }
              >
                <MdDashboard /> Home
              </NavLink>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
