"use client";
import React, { useState } from "react";
import { FaHeart, FaSearch, FaShoppingBag, FaStar } from "react-icons/fa";
import { TiArrowLoop } from "react-icons/ti";
import img from "/Home/medicine5.png";
import sup1 from "/Home/sup1.jpg";
import sup2 from "/Home/sup2.jpg";
import sup3 from "/Home/sup3.jpg";
import sup4 from "/Home/sup4.jpg";

export default function PopularCategory() {
  const [selectedCategory, setSelectedCategory] = useState("Supplements");

  const items = [
    {
      id: 1,
      category: "Supplements",
      title: "Vitamin C 500mg",
      subtitle: "Vitamins",
      price: "$16.00",
      icon: <FaStar />,
      bg: sup1,
    },
    {
      id: 2,
      category: "Supplements",
      title: "Calcium + D3 Tablets",
      subtitle: "Minerals",
      price: "$12.00",
      icon: <FaStar />,
      bg: img,
    },
    {
      id: 3,
      category: "Supplements",
      title: "Omega 3 Softgels",
      subtitle: "Fish Oil",
      price: "$20.00",
      icon: <FaStar />,
      bg: sup2,
    },
    {
      id: 4,
      category: "Supplements",
      title: "Zinc Tablets",
      subtitle: "Immune Support",
      price: "$10.00",
      icon: <FaStar />,
      bg: sup3,
    },
    {
      id: 5,
      category: "Supplements",
      title: "Magnesium Capsules",
      subtitle: "Muscle Health",
      price: "$15.00",
      icon: <FaStar />,
      bg: sup4,
    },

    {
      id: 6,
      category: "Medicines",
      title: "Paracetamol",
      subtitle: "Pain Relief",
      price: "$5.00",
      icon: <FaStar />,
    },
    {
      id: 7,
      category: "Medicines",
      title: "Ibuprofen",
      subtitle: "Anti-inflammatory",
      price: "$6.50",
      icon: <FaStar />,
    },
    {
      id: 8,
      category: "Medicines",
      title: "Cough Syrup",
      subtitle: "Cold & Flu",
      price: "$7.00",
      icon: <FaStar />,
    },
    {
      id: 9,
      category: "Medicines",
      title: "Amoxicillin",
      subtitle: "Antibiotic",
      price: "$9.00",
      icon: <FaStar />,
    },

    {
      id: 10,
      category: "Herbs",
      title: "Tulsi Drops",
      subtitle: "Herbal Remedy",
      price: "$8.00",
      icon: <FaStar />,
    },
    {
      id: 11,
      category: "Herbs",
      title: "Ashwagandha",
      subtitle: "Stress Relief",
      price: "$10.00",
      icon: <FaStar />,
    },
    {
      id: 12,
      category: "Herbs",
      title: "Triphala Powder",
      subtitle: "Digestive",
      price: "$6.50",
      icon: <FaStar />,
    },
  ];

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory
  );
  const visibleItems =
    selectedCategory === "Supplements"
      ? filteredItems.slice(0, 5)
      : selectedCategory === "Medicines"
      ? filteredItems.slice(0, 4)
      : filteredItems.slice(0, 3);

  const gridCols =
    selectedCategory === "Supplements"
      ? "lg:grid-cols-5"
      : selectedCategory === "Medicines"
      ? "lg:grid-cols-4"
      : "lg:grid-cols-3";

  return (
    <div className="mt-6 px-4 md:px-8 xl:px-16 mb-6">
      <h1 className="text-center font-bold text-2xl sm:text-3xl mb-6 text-[#009688]">
        Popular Categories
      </h1>

      <div className="flex flex-wrap justify-center gap-3 items-center mb-6">
        {["Supplements", "Medicines", "Herbs"].map((category) => (
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

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gridCols} gap-6`}
      >
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden group bg-white shadow-md hover:shadow-xl rounded-xl p-4 transition-transform duration-300 transform hover:scale-[1.03]"
          >
            <img
              src={item.bg ? item.bg : img}
              alt={item.title}
              className="rounded-md w-full object-cover h-40 sm:h-48 md:h-44 xl:h-40"
            />

            <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
              <FaHeart className="text-[#009688] text-xl hover:scale-110" />
              <TiArrowLoop className="text-[#009688] text-xl hover:scale-110" />
              <FaSearch className="text-[#009688] text-xl hover:scale-110" />
            </div>

            <h2 className="font-semibold text-lg mt-3">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.subtitle}</p>

            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3].map((i) => (
                <span key={i} className="text-[#009688]">
                  {item.icon}
                </span>
              ))}
              <span className="text-[#009688] ml-1">{item.id}</span>
            </div>

            <p className="font-bold text-base mt-2">{item.price}</p>

            <div className="bg-[#009688] rounded-3xl text-white py-2 px-4 w-[80%] sm:w-[90%] md:w-[70%] lg:w-[80%] xl:w-[70%] mx-auto flex justify-center items-center mt-3 cursor-pointer gap-2 hover:bg-[#007e71] transition">
              <FaShoppingBag />
              <button className="text-sm sm:text-base">Select options</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
