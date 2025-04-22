import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky -top-1 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="./logo.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <ul className="hidden md:flex flex-1 justify-center items-center space-x-8 font-bold text-[#184363]">
          <li className="hover:text-orange-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>

          <li className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-orange-500"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products <FaChevronDown className="text-sm mt-0.5" />
            </div>
            {productDropdown && (
              <ul className="absolute top-8 bg-white shadow-md rounded w-56 py-2 z-10">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-nowrap">
                  <Link to="/products/prescription">
                    Prescription Medicines
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-nowrap">
                  <Link to="/products/otc">OTC Medicines</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-nowrap">
                  <Link to="/products/supplements">Supplements & Vitamins</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-nowrap">
                  <Link to="/products/equipment">Medical Equipment</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-nowrap">
                  <Link to="/products/baby-care">Baby Care</Link>
                </li>
              </ul>
            )}
          </li>

          <li className="hover:text-orange-500 cursor-pointer">
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="hover:text-orange-500 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-orange-500 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/appointments">
            <button className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 cursor-pointer">
              Get Appointment
            </button>
          </Link>
          <Link to="/courses">
            <button className="px-4 py-2 border rounded-full text-[#184363] hover:bg-gray-100 cursor-pointer">
              Other Courses
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-2xl text-[#184363]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3">
          <Link
            to="/"
            className="text-[#184363]"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <div>
            <div
              className="flex items-center gap-1 text-[#184363] cursor-pointer"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products <FaChevronDown className="text-sm mt-0.5" />
            </div>
            {productDropdown && (
              <ul className="pl-4 mt-2 space-y-1">
                <li>
                  <Link
                    to="/products/prescription"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Prescription Medicines
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/otc"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    OTC Medicines
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/supplements"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Supplements & Vitamins
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/equipment"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Medical Equipment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/baby-care"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Baby Care
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link
            to="/blogs"
            className="text-[#184363]"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="text-[#184363]"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-[#184363]"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <div className="pt-4 space-y-2">
            <Link to="/appointments">
              <button className="w-full bg-orange-400 text-white py-2 rounded-full cursor-pointer">
                Get Appointment
              </button>
            </Link>
            <Link to="/courses">
              <button className="w-full border py-2 rounded-full text-[#184363] cursor-pointer">
                Other Courses
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
