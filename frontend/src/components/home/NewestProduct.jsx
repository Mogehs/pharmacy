import React from "react";
import bg2 from "/Home/bg2.jpg";
import medicine from "/Home/medicine5.png";
import { FaArrowRight } from "react-icons/fa";

export default function NewestProduct() {
  return (
    <div
      className="relative w-full rounded-md px-4 py-8 sm:p-6 md:py-10 lg:py-16 my-6 flex flex-col md:flex-row items-center justify-between gap-6"
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Text Content */}
      <div className="w-full md:w-2/3 lg:w-1/2 text-center md:text-left space-y-4">
        <p className="inline-block bg-[#009688] text-white text-xs sm:text-sm md:text-base px-4 py-2 rounded-3xl">
          Get it now 45% OFF
        </p>
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-black">
          Save up to 10% extra & enjoy FREE delivery with PLUS membership
        </h1>
        <button className="flex items-center justify-center gap-2 bg-[#009688] text-white px-5 py-2 rounded-3xl text-sm sm:text-base hover:bg-[#007f73] transition-all w-fit mx-auto md:mx-0">
          <span>Shop Now</span>
          <FaArrowRight />
        </button>
      </div>

      {/* Medicine Image */}
      <div
        className="w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${medicine})` }}
      ></div>
    </div>
  );
}
