import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { FaBoxTissue, FaSocks, FaUserMd, FaPrescriptionBottle, FaDog } from 'react-icons/fa';
import { MdLocalGroceryStore } from "react-icons/md";
import { LiaSprayCanSolid } from "react-icons/lia";
import { GiBottleVapors, GiMedicines } from "react-icons/gi";
import { TbVaccineBottle } from "react-icons/tb";
import { BsCapsulePill } from "react-icons/bs";
import { BiCapsule } from "react-icons/bi";

export default function Category() {
    const category = [
        { icon: <FaSocks />, title: "Baby" },
        { icon: <FaBoxTissue />, title: "Beauty" },
        { icon: <MdLocalGroceryStore />, title: "Grocery" },
        { icon: <LiaSprayCanSolid />, title: "Health Topics" },
        { icon: <GiBottleVapors />, title: "Herbs" },
        { icon: <GiMedicines />, title: "Medicines" },
        { icon: <FaUserMd />, title: "Personal Care" },
        { icon: <FaDog />, title: "Pet Care" },
        { icon: <TbVaccineBottle />, title: "Protein" },
        { icon: <FaPrescriptionBottle />, title: "Sports Nutrition" },
        { icon: <BsCapsulePill />, title: "Supplements" },
        { icon: <BiCapsule />, title: "Vitamins" }
    ];

    return (
        <div className="w-full px-4 py-6 bg-gray-100">
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                slidesPerView={6}
                slidesPerGroup={1}
                breakpoints={{
                    0: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 }
                }}
            >
                {category.map((cat, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex cursor-pointer flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 hover:bg-blue-100 transition duration-300">
                            <div className="text-3xl mb-2 text-[#009688]">{cat.icon}</div>
                            <p className="text-sm font-medium text-center">{cat.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
