"use client";
import React, { useState } from "react";
import { FaHeart, FaSearch, FaShoppingBag, FaStar } from "react-icons/fa";
import { TiArrowLoop } from "react-icons/ti";
import { useGetProductsQuery } from "../features/productsApi";
import defaultImg from "/Home/medicine5.png"; // fallback image
import { Link } from "react-router-dom";

export default function PopularCategory() {
  const [selectedCategory, setSelectedCategory] = useState("Antibiotics");
  const { data: items = [], isLoading } = useGetProductsQuery();

  const categories = ["Antibiotics", "Allergy", "Diabeties", "Pain Relief"];

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory
  );

  const visibleItems =
    selectedCategory === "Antibiotics"
      ? filteredItems.slice(0, 5)
      : selectedCategory === "Allergy"
      ? filteredItems.slice(0, 4)
      : filteredItems.slice(0, 3);

  const gridCols =
    selectedCategory === "Antibiotics"
      ? "lg:grid-cols-5"
      : selectedCategory === "Allergy"
      ? "lg:grid-cols-4"
      : "lg:grid-cols-3";

  return (
    <div className="mt-6 px-4 md:px-8 xl:px-16 mb-6">
      <h1 className="text-center font-bold text-2xl sm:text-3xl mb-6 text-[#009688]">
        Popular Categories
      </h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 items-center mb-6">
        {categories.map((category) => (
          <span
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer text-sm sm:text-base py-2 px-4 sm:px-5 rounded-3xl transition-all duration-300 border ${
              selectedCategory === category
                ? "bg-[#009688] text-white"
                : "bg-transparent hover:bg-[#009688] hover:text-white"
            }`}
          >
            {category}
          </span>
        ))}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridCols} gap-6`}
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white shadow rounded-xl p-4 space-y-3"
            >
              <div className="bg-gray-300 h-40 rounded-md w-full" />
              <div className="bg-gray-300 h-4 w-2/3 rounded" />
              <div className="bg-gray-200 h-3 w-full rounded" />
              <div className="bg-gray-200 h-3 w-1/2 rounded" />
              <div className="bg-gray-300 h-8 w-[80%] rounded-3xl mx-auto mt-2" />
            </div>
          ))}
        </div>
      ) : (
        // Product Grid
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridCols} gap-6`}
        >
          {visibleItems.map((item) => (
            <div
              key={item._id}
              className="relative overflow-hidden group bg-white shadow-md hover:shadow-xl rounded-xl p-4 transition-transform duration-300 transform hover:scale-[1.03]"
            >
              <img
                src={item.image || item.images?.[0] || defaultImg}
                alt={item.name}
                className="rounded-md w-full object-cover h-40 sm:h-48 md:h-44 xl:h-40"
              />

              <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                <FaHeart className="text-[#009688] text-xl hover:scale-110" />
                <TiArrowLoop className="text-[#009688] text-xl hover:scale-110" />
                <FaSearch className="text-[#009688] text-xl hover:scale-110" />
              </div>

              <h2 className="font-semibold text-lg mt-3">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>

              <div className="flex items-center gap-1 mt-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="text-[#009688]">
                    <FaStar />
                  </span>
                ))}
                <span className="text-[#009688] ml-1">{item.price}</span>
              </div>

              <p className="font-bold text-base mt-2">${item.price}</p>

              <div className="bg-[#009688] rounded-3xl text-white py-2 px-2 w-[80%] sm:w-[90%] md:w-[70%] lg:w-[80%] xl:w-[70%] mx-auto flex justify-center items-center mt-3 cursor-pointer gap-2 hover:bg-[#007e71] transition">
                <FaShoppingBag />
                <Link to="/products">
                  <button className="text-sm sm:text-base">
                    Select options
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
