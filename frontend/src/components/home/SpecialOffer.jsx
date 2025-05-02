import React from "react";
import bgimg from "/Home/bgimg.jpg";
import bgimg2 from "/Home/bgimg2.jpg";

export default function SpecialOffer() {
  return (
    <div className="mb-8 px-4">
      <h1 className="text-center text-[#009688] font-bold text-3xl mb-8">
        Special Offers
      </h1>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div
          className="h-[45vh] sm:h-[50vh] p-6 flex flex-col justify-between rounded-lg text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg})` }}
        >
          <div>
            <span className="inline-block bg-[#009688] px-4 py-1 text-sm rounded-3xl">
              From $0.99
            </span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">Breathable</h2>
            <p className="text-lg font-serif mb-3">Face Mask</p>
            <button className="bg-[#009688] text-white px-5 py-2 rounded-3xl text-sm hover:bg-[#007f73] transition-all">
              Shop Now
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="h-[45vh] sm:h-[50vh] p-6 flex flex-col justify-between rounded-lg text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${bgimg2})` }}
        >
          <div>
            <span className="inline-block bg-[#009688] px-4 py-1 text-sm rounded-3xl">
              From $9.99
            </span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">
              Covid 19 Pack
            </h2>
            <p className="text-lg font-serif mb-3">Get it now 45% Off</p>
            <button className="bg-[#009688] text-white px-5 py-2 rounded-3xl text-sm hover:bg-[#007f73] transition-all">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
