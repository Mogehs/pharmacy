import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa";

const cardData = [
  {
    id: 1,
    description:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born",
    image: "./about/test3.jpg",
    name: "Ali Raza",
  },
  {
    id: 2,
    description:
      "These worked out well for the crab-feed I was attending the other week and got here just on time.",
    image: "./about/test2.jpg",
    name: "Sana Tariq",
  },
  {
    id: 3,
    description:
      "There was a small mistake in the order. In return, I got the correct order and I could keep the wrong one for myself.",
    image: "./about/test4.jpg",
    name: "Ahmed Khan",
  },
  {
    id: 4,
    description:
      "These settings don’t provide big changes but only some small css changes in spaces or borders for example.",
    image: "./about/test5.jpg",
    name: "Zara Shah",
  },
  {
    id: 5,
    description:
      "Fatima Butt a good provide big changes but only some small css changes in spaces or borders for example.",
    image: "./about/inst.jpg",
    name: "Fatima Butt",
  },
];

const AboutCrousel = () => {
  const scrollRef = useRef();

  const cardWidth = 300 + 24; // card width + gap (gap-6 = 1.5rem = 24px)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: cardWidth * 3, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: -cardWidth * 3, behavior: "smooth" });
  };

  return (
    <section
      className="py-16 px-4 text-center bg-cover bg-center"
      style={{ backgroundImage: "url('./about/slide2.jpg')" }}
    >
      {/* Heading */}
      <h2 className="text-3xl font-bold txt-gl mb-4">
        What Our People Say
      </h2>

      {/* Description */}
      <p className="text-gray-500 max-w-xl text-sm font-medium mx-auto mb-10">
        We are proud of the feedback we receive from our customers. Here's what
        they have to say about their experience with us.
      </p>

      {/* Scrollable Carousel */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={scrollRight}
          className="absolute left-0 z-10 bg-white txt-gl p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <FaLessThan />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-10 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {cardData.map((item) => (
            <div
              key={item.id}
              className="w-[300px] bg-white rounded-xl p-4 shadow flex-shrink-0 flex flex-col items-center text-center"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex txt-gl text-xl mb-3">
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-sm text-gray-500 mb-4">{item.description}</p>
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-full mb-2"
              />
              <h4 className="txt-gd font-semibold">{item.name}</h4>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute right-0 z-10 bg-white text-[#184363] p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <FaGreaterThan />
        </button>
      </div>
    </section>
  );
};

export default AboutCrousel;
