import React, { useState, useEffect } from 'react';
import {  FaArrowRight } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const images = [
    {
        title:'Pyridoxine Vitamin B6',description:"Vitamin & Supplemnets",btn:"Buy it now" ,icon:<IoIosArrowForward />
    },
];

export default function SliderHome() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-full mt-4 sm:mt-6">
      <div className="w-full sm:w-11/12 mx-auto rounded-md shadow-lg bg-red-300 overflow-hidden">
       

        <div className="relative h-56 md:h-96 rounded-lg overflow-hidden">
          {images.map((img, index) => (
            <div className=''>
                

            </div>
        
          ))}

          {/* Navigation buttons */}
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2  bg-blue-400 hover:bg-gray-200 text-black p-2 rounded-[50%] shadow-md z-20 cursor-pointer group"
          >
            <FaArrowLeftLong className=' text-white group-hover:text-black'/>

          </button>
          <button
            onClick={goNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-400 hover:bg-gray-200 text-black p-2 rounded-[50%] shadow-md z-20 cursor-pointer group"
          >
            <FaArrowRight className=' text-white group-hover:text-black'/>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2 pb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current ? 'bg-cyan-600 scale-110' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
