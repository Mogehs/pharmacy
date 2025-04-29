import React from 'react';
import { FaGreaterThan } from "react-icons/fa6";

const iconItems = [
  "Nor again is there anyone who loves or pursues or desires.",
  "But I must explain to you how all this mistaken idea.",
  "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure.",
];

const WhatMakes = () => {
  return (
    <section className="flex flex-col md:flex-row items-start gap-10 p-4 md:p-12 mt-8">
      {/* left Side */}
      <div className="flex-1 flex flex-col items-center">
        <img
          src="./about/post9.jpg"
          alt="Image"
          className="mb-4 rounded-2xl shadow hover:scale-103 transition-transform duration-300"
        />
      </div>

      {/* right Side */}
      <div className="flex-1 md:mt-8">
        <h2 className="text-xl text-[#00B8A9] font-bold inline-block cursor-pointer">
          What Makes Us, Us?
        </h2>
        <p className="text-gray-500 mt-3 md:mt-6">
          But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human.
        </p>

        <div className="flex-1 mt-3">
          <h2 className="text-xl text-[#00B8A9] font-bold inline-block cursor-pointer">
            Our background
          </h2>
          <p className="text-gray-500 md:mt-2">
            Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because.
          </p>

          {/* Icons Section with map */}
          <div className="mt-4 flex flex-col gap-4">
            {iconItems.map((text, index) => (
              <div key={index} className="flex items-center gap-2">
                <FaGreaterThan className="text-[#00B8A9] text-[15px]" />
                <span className="text-gray-500 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatMakes;
