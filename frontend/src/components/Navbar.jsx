import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUniqueCategories } from "../store/shop/ShopSelector";
import { setCategory } from "../store/shop/ShopSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const dispatch = useDispatch();
  const categories = useSelector(selectUniqueCategories);

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="./logo.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-1 justify-center  items-center space-x-6 font-bold">
          <li className="hover:text-[#525052] text-[#a8754d]">
            <Link to="/">Home</Link>
          </li>

          <li className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-[#525052] text-[#a8754d]"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products <FaChevronDown className="text-sm mt-0.5" />
            </div>
            {productDropdown && (
              <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-md w-56 py-2 z-50 overflow-y-auto h-[50vh] space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c] transition-all duration-300">

                {categories.map((category) => (
                  <li key={category} className=" hover:text-[#525052] text-[#a8754d] whitespace-nowrap">
                    <Link
                      to="/products"
                      onClick={() => {
                        dispatch(setCategory(category === "All" ? "" : category));
                        setMenuOpen(false); // if you're closing the mobile menu
                        setProductDropdown(false); // close dropdown
                      }}
                      className="block px-4 py-2 hover:text-[#525052] text-[#a8754d]"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="hover:text-[#525052] text-[#a8754d]">
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="hover:text-[#525052] text-[#a8754d]">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-[#525052] text-[#a8754d]">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right Buttons & Cart */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/cart" className="relative hover:text-[#525052] text-[#a8754d] text-2xl">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#a8754d] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartItems.length}
              </span>
            )}
          </Link>

          <Link to="/appointments">
            <button className="px-4 text-sm py-2 cursor-pointer border border-[#a8754d] hover:text-[#a8754d] hover:bg-white bg-[#a8754d] text-white rounded-full ">
              Get Appointment
            </button>
          </Link>
          <Link to="/courses">
            <button className="px-4 text-sm py-2 hover:text-white border border-[#a8754d] rounded-full text-[#a8754d] hover:bg-[#a8754d] cursor-pointer">
              Other Courses
            </button>
          </Link>
        </div>


        {/* Mobile Menu Icon */}
        <div className="lg:hidden text-2xl hover:text-[#525052] text-[#a8754d]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 px-4 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-[#525052] text-[#a8754d]">Home</Link>

          <div>
            <div
              className="flex items-center gap-1 hover:text-[#525052] text-[#a8754d] cursor-pointer"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products <FaChevronDown className="text-sm mt-0.5" />
            </div>
            {productDropdown && (
              <>
                <ul className="overflow-y-auto h-[50vh] space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c] transition-all duration-300">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to="/products"
                        onClick={() => {
                          dispatch(setCategory(category === "All" ? "" : category));
                          setMenuOpen(false); // if you're closing the mobile menu
                          setProductDropdown(false); // close dropdown
                        }}
                        className="block px-4 py-2 hover:text-[#525052] text-[#a8754d]"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>

            )}
          </div>

          <Link to="/blogs" onClick={() => setMenuOpen(false)} className="block hover:text-[#525052] text-[#a8754d]">
            Blogs
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-[#525052] text-[#a8754d]">
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-[#525052] text-[#a8754d]">
            Contact
          </Link>
          <Link to="/cart" className="relative hover:text-[#525052] text-[#a8754d] text-2xl">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 left-4 bg-[#a8754d] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartItems.length}
              </span>
            )}
          </Link>

          <div className="pt-4 flex flex-col gap-3">
            <Link to="/appointments">
              <button className="w-full border border-[#a8754d] hover:text-[#a8754d] hover:bg-white bg-[#a8754d] text-white py-2 rounded-full">
                Get Appointment
              </button>
            </Link>
            <Link to="/courses">
              <button className="w-full py-2  hover:text-white border border-[#a8754d] rounded-full text-[#a8754d] hover:bg-[#a8754d]">
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
