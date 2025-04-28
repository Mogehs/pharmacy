import React from 'react';
import { FaCartShopping } from 'react-icons/fa6';

const ProductCard = () => {
    const scrollProduct = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1670201202788-522ad9d46a9b?w=500&auto=format&fit=crop&q=60",
            desc: "Supplement, Vitamins",
            title: "Vitamin C 500mg Sugarless Tab",
            ranks: "⭐⭐⭐⭐⭐",
            price: "101",
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1670201202788-522ad9d46a9b?w=500&auto=format&fit=crop&q=60",
            desc: "Supplement, Vitamins",
            title: "Vitamin C 500mg Sugarless Tab",
            ranks: "⭐⭐⭐⭐⭐",
            price: "101",
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1670201202788-522ad9d46a9b?w=500&auto=format&fit=crop&q=60",
            desc: "Supplement, Vitamins",
            title: "Vitamin C 500mg Sugarless Tab",
            ranks: "⭐⭐⭐⭐⭐",
            price: "101",
        },

        // Add more products...
    ];

    return (
        <div>
            <div className="w-full  mt-10">
                <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {scrollProduct.map((product) => (
                        <div key={product.id} className="flex m-1 gap-3 flex-col items-center p-3 shadow-lg">
                            <img
                                className="object-cover bg-center h-40 rounded-xl w-full"
                                src={product.img}
                                alt={product.title}
                            />
                            <p>{product.desc}</p>
                            <h1>{product.title}</h1>
                            <p>{product.ranks}</p>
                            <h1>${product.price}</h1>
                            <button className="px-10 flex justify-center gap-3 items-center py-2 rounded-full bg-gray-300">
                                <FaCartShopping />
                                <span>Select Option</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;