import React, { useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { GoDot } from 'react-icons/go';

const products = [
    {
        name: 'Vitamin C 500',
        category: 'Supplement, Vitamins',
        price: '$103',
        rating: '⭐⭐⭐⭐⭐',
        image: 'https://plus.unsplash.com/premium_photo-1680859126131-d91874d9f5e8?w=500&auto=format&fit=crop&q=60',
    },
    {
        name: 'Protein Mix',
        category: 'Supplement, Vitamins',
        price: '$103',
        rating: '⭐⭐⭐⭐⭐',
        image: 'https://media.istockphoto.com/id/836205372/photo/assortment-of-healthy-protein-source-and-body-building-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=TyxNF2u2QP36QWgfbgc_BLU8ie3mUVn7bBwYsDbgDe0=',
    },
    {
        name: 'Omega 3 1000mg',
        category: 'Supplement, Vitamins',
        price: '$103',
        rating: '⭐⭐⭐⭐⭐',
        image: 'https://plus.unsplash.com/premium_photo-1681408059516-c8b54ed3a719?w=500&auto=format&fit=crop&q=60',
    },
];

const ProductCard = ({ product, active }) => (
    <div
        className={`border-2 border-yellow-300 rounded-xl p-4 shadow-md flex flex-col items-center gap-3 absolute w-full transition-all duration-500 ${active ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
            }`}
    >
        <img src={product.image} alt={product.name} className="rounded-lg w-full object-cover h-40" />
        <p className="text-sm text-gray-600">{product.category}</p>
        <h1 className="text-lg font-semibold text-gray-800">{product.name}</h1>
        <p className="text-yellow-500">{product.rating}</p>
        <h1 className="text-xl font-bold text-blue-800">{product.price}</h1>
        <button className="bg-blue-100 hover:bg-blue-200 transition px-5 py-2 rounded-full flex items-center gap-2 text-sm cursor-pointer font-medium text-blue-700">
            <FaCartShopping />
            Select Option
        </button>
    </div>
);

const Last = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="p-2 w-full flex flex-col gap-6 relative">
            {/* Highlighted Product Area */}
            <div className="relative h-[400px] overflow-hidden">
                {products.map((prod, index) => (
                    <ProductCard key={index} product={prod} active={index === activeIndex} />
                ))}
            </div>

            {/* Dot Navigation */}
            <div className="flex justify-center gap-1 mt-2">
                {products.map((_, idx) => (
                    <GoDot
                        key={idx}
                        className={`text-2xl cursor-pointer transition-colors ${idx === activeIndex ? 'text-blue-500' : 'text-gray-500'
                            }`}
                        onClick={() => setActiveIndex(idx)}
                    />
                ))}
            </div>

            {/* Grid of Small Products */}
            <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg shadow hover:shadow-md transition flex flex-col items-center gap-2">
                        <img src={products[0].image} alt={products[0].name} className="rounded-md w-full object-cover h-28" />
                        <p className="text-xs text-gray-500">{products[0].category}</p>
                        <h2 className="text-sm font-semibold text-gray-700">{products[0].name}</h2>
                        <p className="text-yellow-500 text-sm">{products[0].rating}</p>
                        <h3 className="text-md font-bold text-blue-700">{products[0].price}</h3>
                        <button className="bg-gray-200 cursor-pointer hover:bg-gray-300 px-4 py-1 text-sm rounded-full flex items-center gap-1 text-gray-700">
                            <FaCartShopping />
                            Option
                        </button>
                    </div>
                ))}
            </div>

            {/* Featured Image Section */}
            <div className="border-2 border-yellow-300 rounded-xl p-4 shadow-md flex flex-col items-center gap-3">
                <img
                    src="https://media.istockphoto.com/id/2149954181/photo/three-luxury-perfume-bottles.webp?a=1&b=1&s=612x612&w=0&k=20&c=5gilsvwRksAj90KATyWzKgHalog9cfaZScJJl-24ch8="
                    alt="Perfume"
                    className="rounded-lg w-full object-cover h-40"
                />
                <p className="text-sm text-gray-600">Fragrance, Luxury</p>
                <h1 className="text-lg font-semibold text-gray-800">Luxury Perfume</h1>
                <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
                <h1 className="text-xl font-bold text-blue-800">$199</h1>
                <button className="bg-blue-100 hover:bg-blue-200 px-5 py-2 rounded-full flex items-center gap-2 text-sm font-medium text-blue-700">
                    <FaCartShopping />
                    Select Option
                </button>
            </div>
        </div>
    );
};

export default Last;