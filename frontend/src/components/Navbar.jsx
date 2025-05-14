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
import { useLogoutUserMutation } from "./features/userApi";
import { setUser } from "./features/userSlice";
import { useGetProductsQuery } from "./features/productsApi";
import { setCategory } from "./features/productSlice";
import { useGetCartQuery } from "./features/cartApi";
import { AnimatePresence, motion } from "framer-motion";

const others = [
  { id: 1, name: "YouTube Videos", link: "/youtubevideo" },
  { id: 2, name: "Courses", link: "/courses" },
  // { id: 3, name: "Admission", link: "/admissions" },
  { id: 4, name: "Orders & Appointments", link: "/orders" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { data: products = [] } = useGetProductsQuery();
  const { data: cart = {} } = useGetCartQuery();
  const cartItems = cart?.products || [];
  const user = useSelector((state) => state.user.user);
  const [logoutUser] = useLogoutUserMutation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [otherDropdown, setOtherDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const productDropdownRef = useRef(null);
  const otherDropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        !productDropdownRef.current?.contains(target) &&
        !otherDropdownRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setProductDropdown(false);
        setOtherDropdown(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    dispatch(setUser(null));
  };
  const categories = [
    ...new Set(products?.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-60">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-1 justify-center items-center space-x-6 font-bold">
          <li className="hover:text-[#009688] text-[#00B8A9]">
            <Link to="/">Home</Link>
          </li>

          <li className="relative" ref={productDropdownRef}>
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-[#009688] text-[#00B8A9]"
              onClick={() => {
                setProductDropdown(!productDropdown);
                setOtherDropdown(false);
              }}
            >
              Products
              <FaChevronDown
                className={`text-sm mt-1 ${
                  !productDropdown && "-rotate-90"
                } transition-all duration-400`}
              />
            </div>
            <AnimatePresence initial={false}>
              {productDropdown && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-md w-56 py-2 z-50 overflow-y-auto max-h-[50vh] mt-5 space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c]">
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
                </motion.div>
              )}
            </AnimatePresence>
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

          <li className="relative" ref={otherDropdownRef}>
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-[#009688] text-[#00B8A9]"
              onClick={() => {
                setOtherDropdown(!otherDropdown);
                setProductDropdown(false);
              }}
            >
              Others
              <FaChevronDown
                className={`text-sm mt-1 ${
                  !otherDropdown && "-rotate-90"
                } transition-all duration-400`}
              />
            </div>
            {otherDropdown && (
              <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-md w-56 py-2 z-50 overflow-y-auto max-h-[50vh] mt-5 space-y-1 px-2 scrollbar-thin scrollbar-thumb-[#a8754d] scrollbar-track-gray-100 hover:scrollbar-thumb-[#925f3c]">
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
          <Link to="/cart" className="relative text-2xl text-[#00B8A9]">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#00B8A9] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] text-sm hover:border-[#009688] cursor-pointer"
              >
                <FaSignOutAlt className="inline-block mr-1" /> Logout
              </button>
              <Link to="/appointments">
                <button className="px-4 text-sm py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688] cursor-pointer">
                  Get Appointment
                </button>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 text-sm border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688] flex items-center gap-2 cursor-pointer">
                <FaSignInAlt /> Login
              </button>
            </Link>
          )}
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

          {/* Mobile Products Dropdown */}
          <div ref={productDropdownRef}>
            <div
              className="flex items-center gap-1 text-[#00B8A9] hover:text-[#009688] cursor-pointer"
              onClick={() => {
                setProductDropdown(!productDropdown);
                setOtherDropdown(false);
              }}
            >
              Products <FaChevronDown className="text-sm mt-1" />
            </div>
            {productDropdown && (
              <ul className="overflow-y-auto h-[50vh] space-y-1 px-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      to="/products"
                      onClick={() => {
                        dispatch(
                          setCategory(category === "All" ? "" : category)
                        );
                        setProductDropdown(false);
                        setMenuOpen(false);
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

          {/* Mobile Others Dropdown */}
          <div ref={otherDropdownRef}>
            <div
              className="flex items-center gap-1 text-[#00B8A9] hover:text-[#009688] cursor-pointer"
              onClick={() => {
                setOtherDropdown(!otherDropdown);
                setProductDropdown(false);
              }}
            >
              Others <FaChevronDown className="text-sm mt-1" />
            </div>

            {otherDropdown && (
              <ul className="overflow-y-auto h-[20vh] space-y-1 px-2">
                {others.map((other) => (
                  <li key={other.id}>
                    <Link
                      to={other.link}
                      onClick={() => {
                        setOtherDropdown(false);
                        setMenuOpen(false);
                      }}
                      className="block px-4 py-1 text-[#00B8A9] hover:text-[#009688]"
                    >
                      {other.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="space-y-4">
            <li className="hover:text-[#009688] text-[#00B8A9]">
              <Link to="/blogs">Blogs</Link>
            </li>
            <li className="hover:text-[#009688] text-[#00B8A9]">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-[#009688] text-[#00B8A9]">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={handleLogout}
                className="px-4 text-sm py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688] cursor-pointer max-sm:w-full"
              >
                <FaSignOutAlt className="inline-block mr-1" /> Logout
              </button>
              <Link to="/appointments">
                <button className="px-4 text-sm py-2 border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688] cursor-pointer max-sm:w-full">
                  Get Appointment
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 text-sm border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full hover:bg-[#009688] hover:border-[#009688] flex items-center gap-2 cursor-pointer">
                <FaSignInAlt /> Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
