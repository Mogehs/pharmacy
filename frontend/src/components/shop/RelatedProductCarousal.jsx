import React from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./products-swiper.css";

import { useGetProductsQuery } from "../../components/features/productsApi";

const RelatedProductsCarousel = () => {
  const { id } = useParams();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <div className="text-center py-10">Loading related products...</div>;
  }

  if (isError || !Array.isArray(products)) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load related products.
      </div>
    );
  }

  const otherProducts = products.filter(
    (product) => product._id.toString() !== id
  );

  return (
    <div className="w-full px-4 md:px-10 py-10 bg-[#f9f9f9] dark:bg-gray-900 rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-[#00B8A9] dark:text-white mb-6 border-l-4 border-primary-color pl-4">
        You May Also Like
      </h2>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="custom-swiper"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        <style>{`
          .swiper-button-next, .swiper-button-prev {
            width: 35px !important;
            height: 35px !important;
            background-color: white;
            border-radius: 50%;
            transition: all 0.3s ease-in-out;
          }
          .swiper-button-next::after, .swiper-button-prev::after {
            font-size: 20px !important;
            color: gray;
          }
          .swiper-button-next:hover, .swiper-button-prev:hover {
            background-color: #009688; 
            border-color: #facc15;
          }
          .swiper-button-next:hover::after, .swiper-button-prev:hover::after {
            color: white;
          }
        `}</style>

        {otherProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Link
              to={`/product/${product._id}`}
              className="block group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-md text-[#009688] md:text-lg font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="text-sm md:text-white">Rs. {product.price}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProductsCarousel;
