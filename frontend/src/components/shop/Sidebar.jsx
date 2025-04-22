import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setRating, setPriceRange } from "../../store/shop/ShopSlice";
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";


const categories = [
    "All",
    "Supplements",
    "Devices",
    "Health Essentials",
    "Medicines",
    "Personal Care",
    "Eye Care",
    "Skin Care",
    "Pain Relief",
    "Allergy",
    "Hydration",
    "First Aid",
    "Diabetes Care",
    "Cold & Cough",
    "Medical Devices",
    "Covid Essentials",
    "Stomach Care",
    "Baby Care",
    "Feminine Care"
];


const Sidebar = () => {
    const dispatch = useDispatch();
    const latestProducts = useSelector(state => state.shop.latestProducts);
    const categoryCounts = useSelector(state => state.shop.categoryCounts);
    const [price, setPrice] = useState(960);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setPrice(value);
        dispatch(setPriceRange([14, value]));
    };

    return (
        <>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-20 left-2 z-50 text-dark-color p-2 rounded transition lg:hidden mt-1"
            >
                {isSidebarOpen ? <IoChevronBackSharp className="text-2xl" /> : <GrFormNext className="text-2xl" />}
            </button>

            <div
                className={`z-40 p-4 overflow-y-auto h-full w-80 fixed lg:static top-0 left-0 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
          ${isSidebarOpen ? "bg-white shadow-lg" : ""} lg:bg-transparent lg:shadow-none ml-[5px]`}
            >
                <div className="space-y-6 text-gray-500 ">


                    <div className="border border-dark-color rounded  p-4 mt-28 lg:mt-0">
                        <h2 className="font-semibold text-2xl mb-3 border-b border-dark-color pb-2 text-dark-color " style={{ fontFamily: 'Fredoka, sans-serif' }}
                        >Categories</h2>
                        <div className="space-y-2">
                            {categories.map((cat, idx) => (
                                <label key={idx} className="flex justify-between text-medium-color items-center">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category"
                                            className="appearance-none w-4 h-4 border border-medium-color rounded-sm mr-2 checked:border-4 checked:border-dark-color checked:ring-1 checked:ring-medium-color"
                                            onChange={() => dispatch(setCategory(cat === "All" ? "" : cat))}
                                        />
                                        <span>{cat}</span>
                                    </div>
                                    <span className="text-sm">
                                        ({cat === "All"
                                            ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
                                            : categoryCounts[cat] || 0})
                                    </span>

                                </label>
                            ))}
                        </div>
                    </div>


                    <div className="border border-dark-color rounded p-4">
                        <h2 className="font-semibold text-md mb-3 border-b border-dark-color pb-2 text-dark-color font-Fredoka text-2xl" style={{ fontFamily: 'Fredoka, sans-serif' }}
                        >Filter By Price</h2>
                        <input
                            type="range"
                            min="14"
                            max="960"
                            value={price}
                            onChange={handlePriceChange}
                            className="w-full accent-light-color mb-2"
                        />
                        <div className="flex justify-between text-sm mb-3">
                            <span className="border border-dark-color px-2 py-1 rounded-md text-dark-color">$14.00</span>
                            <span className="border border-dark-color px-2 py-1 rounded-md text-dark-color">${price}.00</span>
                        </div>
                        <button className="bg-dark-color text-white w-full py-1.5 rounded-full text-sm font-medium hover:bg-medium-color">
                            FILTER
                        </button>
                    </div>


                    <div className="border border-dark-color rounded-xl p-4">
                        <h2 className="font-semibold text-md mb-3 border-b border-dark-color pb-2 text-black font-Fredoka text-2xl" style={{ fontFamily: 'Fredoka, sans-serif' }}
                        >Rating</h2>
                        {[3, 4, 5].map((stars, i) => (
                            <label key={i} className="flex items-center text-sm mb-2">
                                <input
                                    type="radio"
                                    name="rating"
                                    className="appearance-none w-4 h-4 border border-dark-color rounded-sm mr-2 checked:border-4 checked:border-medium-color checked:ring-1 checked:ring-medium-color"
                                    onChange={() => dispatch(setRating(stars))}
                                />
                                {Array.from({ length: 5 }, (_, j) => (
                                    <span key={j} className={`text-lg ${j < stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                ))}
                            </label>
                        ))}
                    </div>


                    <div className="border border-dark-color rounded-xl p-4">
                        <h2 className="font-semibold text-md mb-3 border-b border-dark-color pb-2 text-black font-Fredoka text-2xl" style={{ fontFamily: 'Fredoka, sans-serif' }}
                        >Latest Products</h2>
                        {latestProducts.map((product, index) => (
                            <div key={index} className="mb-3 flex items-center space-x-3">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <p className="text-sm font-medium truncate text-dark-color">{product.title}</p>
                                    <p className="text-sm font-semibold text-medium-color">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Sidebar;
