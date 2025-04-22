import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="./logo.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>

        {/* Desktop Navigation - Centered */}
        <ul className="hidden md:flex flex-1 justify-center items-center space-x-8 font-bold text-[#184363]">
          <li className="hover:text-orange-500 cursor-pointer">Home</li>

          <li className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-orange-500"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products <FaChevronDown className="text-sm mt-0.5" />
            </div>
            {productDropdown && (
              <ul className="absolute top-8 bg-white shadow-md rounded w-40 py-2 z-10">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Product 1</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Product 2</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Product 3</li>
              </ul>
            )}
          </li>

          <li className="hover:text-orange-500 cursor-pointer">Blogs</li>
          <li className="hover:text-orange-500 cursor-pointer">About</li>
          <li className="hover:text-orange-500 cursor-pointer">Contact</li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 cursor-pointer">
          Get Appimnote
          </button>
          <button className="px-4 py-2 border rounded-full text-[#184363] hover:bg-gray-100 cursor-pointer">
        Other Courses 
          </button>
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
          <div className="text-[#184363]">Home</div>

          <div>
            <div
              className="flex items-center gap-1 text-[#184363] cursor-pointer"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products <FaChevronDown className="text-sm mt-0.5" />
            </div>
            {productDropdown && (
              <ul className="pl-4 mt-2 space-y-1">
                <li className="text-gray-700">Product 1</li>
                <li className="text-gray-700">Product 2</li>
                <li className="text-gray-700">Product 3</li>
              </ul>
            )}
          </div>

          <div className="text-[#184363]">Blogs</div>
          <div className="text-[#184363]">About</div>
          <div className="text-[#184363]">Contact</div>

          <div className="pt-4 space-y-2">
          <button className="w-full bg-orange-400 text-white py-2 rounded-full cursor-pointer">
          Get Appimnote
            </button>
            <button className="w-full border py-2 rounded-full text-[#184363] cursor-pointer">
            Other Courses
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
