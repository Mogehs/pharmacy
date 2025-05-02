import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/shop/CartSlice";

import { CiYoutube } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import StarRating from "./StarRating";
import RelatedProductsCarousel from "./RelatedProductCarousal";
import { decreaseProductStock } from "../features/shop/ShopSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.shop.filteredProducts);
  const product = products.find((p) => p.id.toString() === id);

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      dispatch(addToCart(product));
      dispatch(decreaseProductStock(product.id));
    } else {
      alert("Out of Stock!");
    }
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-wrap gap-4 p-6">
      {/* Left Image Section */}
      <div className="w-full md:w-[63%] space-y-4">
        {/* Image Wrapper */}
        <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-xl shadow-lg group">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Optional overlay (for caption or contrast) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg px-1">
          {product.description}
        </p>
      </div>

      {/* Right Details Section */}
      <div className="w-full md:w-[35%] p-3">
        <div className="flex flex-col gap-3 border-b border-[#00B8A9] py-4">
          <h1 className="text-[#00B8A9] text-2xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-600">
              ({product.numReviews} customer reviews)
            </span>
          </div>
        </div>

        <div className="border-b border-[#00B8A9] py-4">
          <ul className="flex flex-col gap-3 text-gray-700">
            <li className="flex items-center gap-2">
              <IoIosCheckmark /> Original Quality
            </li>
            <li className="flex items-center gap-2">
              <IoIosCheckmark /> Fast Delivery
            </li>
            <li className="flex items-center gap-2">
              <IoIosCheckmark /> Secure Packaging
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-5 py-4 border-b border-[#00B8A9]">
          <h1 className="text-2xl font-bold text-primary-color">
            ₹ {product.price}
          </h1>

          <div className="w-full flex flex-col gap-2 p-3 rounded-sm">
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
              className={`px-4 text-sm py-2 cursor-pointer border border-[#00B8A9] 
    ${
      product.stock === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "hover:text-[#fff] hover:bg-[#009688] bg-[#00B8A9] text-white"
    } 
    rounded-full transition-all duration-600 ease-in-out mt-4`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          <p className="text-red-600 font-medium">
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>
        </div>

        {/* Info Tags */}
        <div className="border-b py-3 border-[#00B8A9] text-sm">
          <ul className="flex flex-col gap-1">
            <li>
              <span className="text-blue-900 font-semibold">SKU:</span> #
              {product.id}
            </li>
            <li>
              <span className="text-blue-900 font-semibold">Category:</span>{" "}
              {product.category}
            </li>
            <li>
              <span className="text-blue-900 font-semibold">Tag:</span> Health
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-wrap gap-4 py-5">
          <span className="px-2 py-2 text-blue-500 bg-gray-200 rounded-full cursor-pointer">
            <FaFacebookF />
          </span>
          <span className="px-2 py-2 text-blue-500 bg-gray-200 rounded-full cursor-pointer">
            <FaLinkedinIn />
          </span>
          <span className="px-2 py-2 text-green-700 bg-gray-200 rounded-full cursor-pointer">
            <FaWhatsapp />
          </span>
          <span className="px-2 py-2 text-blue-600 bg-gray-200 rounded-full cursor-pointer">
            <FaTelegramPlane />
          </span>
          <span className="px-2 py-2 text-red-500 bg-gray-200 rounded-full cursor-pointer">
            <CiYoutube />
          </span>
        </div>
      </div>
      <RelatedProductsCarousel />
    </div>
  );
};

export default ProductDetail;
