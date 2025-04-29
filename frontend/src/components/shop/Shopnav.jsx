import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import { ChevronDown, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOption } from "../../store/shop/ShopSlice";
import Sidebar from './Sidebar';


const Shopnav = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [showSort, setShowSort] = useState(false); // toggle dropdown
    const dispatch = useDispatch();
    const sortOption = useSelector(state => state.shop.sortOption);

    const sortOptions = [
        'Sort by average rating',
        'Sort by latest',
        'Sort by price: low to high',
        'Sort by price: high to low'
    ];

    return (
        <div className="w-full min-h-screen text-light-color flex justify-center items-start py-10 px-4">
            <div className="w-full max-w-7xl">

                <div className="flex justify-between items-center border border-[#00B8A9] text-dark-color px-6 py-3 mb-8 rounded shadow-md" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="text-sm text-[#00B8A9] flex items-center gap-1 border-r border-[#00B8A9] pr-4"
                    >
                        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'} <Menu size={14} />
                    </button>

                    <div className="relative text-sm px-4 bg-white rounded cursor-pointer">
                        <button
                            onClick={() => setShowSort(!showSort)}
                            className="flex items-center gap-1 text-[#00B8A9]"
                        >
                            {sortOption} <ChevronDown className="w-4 h-4" />
                        </button>
                        {showSort && (
                            <ul className="absolute right-0 top-8 w-52 bg-white shadow-lg z-10 rounded overflow-hidden">
                                {sortOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 text-[#00B8A9]"
                                        onClick={() => {
                                            dispatch(setSortOption(option));
                                            setShowSort(false); // close after selecting
                                        }}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="flex gap-6">
                    {showSidebar && <Sidebar />}
                    <ProductGrid />
                </div>
            </div>
        </div>
    );
};

export default Shopnav;
