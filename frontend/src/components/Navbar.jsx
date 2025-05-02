import React, { useState, useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUniqueCategories } from "../components/features/shop/ShopSelector";
import { setCategory } from "../components/features/shop/ShopSlice";

const others = [
  { id: 1, name: "Courses", link: "/courses" },
  { id: 2, name: "Admission", link: "/admissions" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [otherDropdown, setOtherDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const categories = useSelector(selectUniqueCategories);

  const productDropdownRef = useRef(null);
  const otherDropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target) &&
        otherDropdownRef.current &&
        !otherDropdownRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setProductDropdown(false);
        setOtherDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img
            src="./logo.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-1 justify-center items-center space-x-6 font-bold">
          <li className="hover:text-[#009688] text-[#00B8A9]">
            <Link to="/">Home</Link>
          </li>

          <li className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-[#009688] text-[#00B8A9]"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products{" "}
              <FaChevronDown
                className={`text-sm mt-1 ${!productDropdown && "-rotate-90"}`}
              />
            </div>
            {productDropdown && (
              <ul
                ref={productDropdownRef}
                className="absolute top-8 left-0 bg-white shadow-lg rounded-md w-56 py-2 z-50 overflow-y-auto h-[50vh] space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c]"
              >
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      to="/products"
                      onClick={() => {
                        dispatch(
                          setCategory(category === "All" ? "" : category)
                        );
                        setProductDropdown(false);
                      }}
                      className="block px-4 py-2 hover:text-[#009688] text-[#00B8A9]"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="hover:text-[#009688] text-[#00B8A9]">
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="hover:text-[#009688] text-[#00B8A9]">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-[#009688] text-[#00B8A9]">
            <Link to="/contact">Contact</Link>
          </li>

          <li className="relative">
            <div
              className="flex items-center justify-center gap-1 cursor-pointer hover:text-[#009688] text-[#00B8A9]"
              onClick={() => setOtherDropdown(!otherDropdown)}
            >
              Others{" "}
              <FaChevronDown
                className={`text-sm mt-1 ${!otherDropdown && "-rotate-90"}`}
              />
            </div>
            {otherDropdown && (
              <ul
                ref={otherDropdownRef}
                className="absolute top-8 left-0 bg-white shadow-lg rounded-md w-56 py-2 z-50 overflow-y-auto h-[20vh] space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c]"
              >
                {others.map((other) => (
                  <li key={other.id}>
                    <Link
                      to={other.link}
                      onClick={() => setOtherDropdown(false)}
                      className="block px-4 py-1 hover:text-[#009688] text-[#00B8A9]"
                    >
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative hover:text-[#009688] text-[#00B8A9] text-2xl"
          >
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#00B8A9] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688]"
            >
              <FaSignOutAlt className="inline-block mr-1" /> Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688] flex items-center gap-2">
                <FaSignInAlt /> Login
              </button>
            </Link>
          )}

          <Link to="/appointments">
            <button className="px-4 text-sm py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688]">
              Get Appointment
            </button>
          </Link>
        </div>

        {/* Mobile Icon */}
        <div
          className="lg:hidden text-2xl text-[#00B8A9]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={menuRef} className="lg:hidden mt-4 px-4 space-y-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-[#00B8A9] hover:text-[#009688]"
          >
            Home
          </Link>

          <div>
            <div
              className="flex items-center gap-1 text-[#00B8A9] hover:text-[#009688] cursor-pointer"
              onClick={() => setProductDropdown(!productDropdown)}
            >
              Products{" "}
              <FaChevronDown
                className={`text-sm mt-1 ${!productDropdown && "-rotate-90"}`}
              />
            </div>
            {productDropdown && (
              <ul className="overflow-y-auto h-[50vh] space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c]">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      to="/products"
                      onClick={() => {
                        dispatch(
                          setCategory(category === "All" ? "" : category)
                        );
                        setMenuOpen(false);
                        setProductDropdown(false);
                      }}
                      className="block px-4 py-2 text-[#00B8A9] hover:text-[#009688]"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div
              className="flex items-center gap-1 text-[#00B8A9] hover:text-[#009688] cursor-pointer"
              onClick={() => setOtherDropdown(!otherDropdown)}
            >
              Others <FaChevronDown className="text-sm mt-0.5 " />
            </div>
            {otherDropdown && (
              <ul className="max-h-[50vh] space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c]">
                {others.map((other) => (
                  <li key={other.id}>
                    <Link
                      to={other.link}
                      onClick={() => {
                        setMenuOpen(false);
                        setOtherDropdown(false);
                      }}
                      className="block px-4 py-2 text-[#00B8A9] hover:text-[#009688]"
                    >
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            to="/blogs"
            onClick={() => setMenuOpen(false)}
            className="block text-[#00B8A9] hover:text-[#009688]"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block text-[#00B8A9] hover:text-[#009688]"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block text-[#00B8A9] hover:text-[#009688]"
          >
            Contact
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="block text-[#00B8A9] hover:text-[#009688]"
          >
            Cart ({cartItems.length})
          </Link>

          <Link to="/appointments" onClick={() => setMenuOpen(false)}>
            <button className="w-full py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688]">
              Get Appointment
            </button>
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setMenuOpen(false);
              }}
              className="w-full py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688]"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688]">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
