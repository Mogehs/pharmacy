import React from 'react';
import { motion } from 'framer-motion';

const topProducts = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        image: "https://cdn.pixabay.com/photo/2017/06/06/22/44/pills-2374714_1280.jpg",
        sold: 320
    },
    {
        id: 2,
        name: "Digital Thermometer",
        image: "https://cdn.pixabay.com/photo/2018/01/07/10/55/thermometer-3063136_1280.jpg",
        sold: 210
    },
    {
        id: 3,
        name: "Vitamin C Tablets",
        image: "https://cdn.pixabay.com/photo/2021/05/10/17/27/vitamin-c-6243336_1280.jpg",
        sold: 185
    },
    {
        id: 4,
        name: "Hand Sanitizer 100ml",
        image: "https://cdn.pixabay.com/photo/2020/03/31/15/29/hand-sanitizer-4981653_1280.jpg",
        sold: 152
    }
];

const TopSellingProducts = () => {
    return (
        <motion.div
            className="bg-white p-5 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-lg font-semibold text-dark-color mb-4">Top Selling Products</h3>
            <div className="space-y-4">
                {topProducts.map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md shadow" />
                            <div>
                                <p className="font-medium text-sm text-dark-color">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.sold} sold</p>
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-medium-color">{product.sold}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default TopSellingProducts;
