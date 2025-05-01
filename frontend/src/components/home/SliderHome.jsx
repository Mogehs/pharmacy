import React, { useState, useEffect } from 'react';
import bg1 from '../../../public/Home/bg1.jpg';
import bg2 from '../../../public/Home/bg2.jpg';
import bg3 from '../../../public/Home/bg3.jpg';
import slide1 from '../../../public/Home/slide1.png';
import slide11 from '../../../public/Home/slide11.png';
import slide2 from '../../../public/Home/slide2.png';
import slide22 from '../../../public/Home/slide22.png';
import slide3 from '../../../public/Home/slide3.png';
import slide33 from '../../../public/Home/slide33.png';
import off from '../../../public/Home/off.png';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

const images = [
  {
    title: 'New Formula',
    description: "Ultra organic face cream",
    btn: "Buy it now",
    icon: <IoIosArrowForward />,
    bg: bg1,
    img1: slide1,
    img2: slide11,
    off: off,
    classes: 'flex relative justify-center items-center'
  },
  {
    title: 'Pyridoxine Vitamin B6',
    description: "Vitamin & Supplements",
    btn: "Buy it now",
    icon: <IoIosArrowForward />,
    bg: bg2,
    img1: slide2,
    img2: slide22,
    off: off,
    classes: 'flex justify-center items-center'
  },
  {
    title: 'For all family members',
    description: "Cold & Flu Protection",
    btn: "Buy it now",
    icon: <IoIosArrowForward />,
    bg: bg3,
    img1: slide3,
    img2: slide33,
    classes: 'flex justify-center items-center'
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

  const currentSlide = images[current];

  return (
    <div className="w-full mt-4 sm:mt-6">
      <div className="w-full sm:w-11/12 mx-auto rounded-md shadow-lg overflow-hidden">
        <div className="relative h-56 md:h-96 rounded-lg overflow-hidden">
          <div
            className="h-full w-full flex justify-center p-4 transition-all duration-500"
            style={{
              backgroundImage: `url(${currentSlide.bg})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="h-full w-full text-start flex flex-col items-center justify-center sm:w-5/12">
              <h1 className="text-md font-serif sm:text-xl text-wrap text-start">{currentSlide.title}</h1>
              <p className="text-lg sm:text-3xl font-bold">{currentSlide.description}</p>
              <div className="flex mt-2 w-[80%] sm:w-[30%]  cursor-pointer rounded-3xl justify-center text-white bg-[#009688] items-center gap-1 py-1 sm:py-2">
                <button>{currentSlide.btn}</button>
                <span>{currentSlide.icon}</span>
              </div>
            </div>

            <div className={`w-full sm:w-5/12 ${currentSlide.classes} h-full relative gap-2 p-2`}>
              <div className="flex-1 flex items-start justify-center">
                <img src={currentSlide.img1} alt="" className="w-full max-w-[150px] sm:max-w-[180px] object-contain" />
              </div>

              {currentSlide.off && (
                <img
                  src={currentSlide.off}
                  alt="offer"
                  className="absolute sm:top-40 sm:left-50 w-14 sm:w-20 h-auto z-10 object-contain"
                />
              )}

              <div className="flex-1 flex items-end justify-center">
                <img src={currentSlide.img2} alt="" className="w-full max-w-[150px] sm:max-w-[180px] object-contain" />
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goPrev}
            className="absolute top-1/2 left-4 hidden sm:flex transform -translate-y-1/2 bg-[#009688] hover:bg-gray-200 text-black p-2 rounded-full shadow-md z-20 cursor-pointer group"
          >
            <FaArrowLeftLong className="text-white group-hover:text-black" />
          </button>
          <button
            onClick={goNext}
            className="absolute top-1/2 right-4 hidden sm:flex  transform -translate-y-1/2 bg-[#009688] hover:bg-gray-200 text-black p-2 rounded-full shadow-md z-20 cursor-pointer group"
          >
            <FaArrowRight className="text-white group-hover:text-black" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2 pb-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-[#009688] scale-110' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
