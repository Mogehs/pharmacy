import React from "react";

const images = [
  "/about/post6.jpg",
  "/about/inst2.jpg",
  "/about/inst.jpg",
  "/about/inst4.jpg",
  "/about/inst5.jpg",
  "/about/inst6.jpg",
];

const AboutFollow = () => {
  return (
    <section className="bg-[#f9fafb] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8">
          Follow us on Instagram <span className="text-[#00B8A9]">@propharm</span>
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`Instagram ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFollow;
