import React from 'react';
import { motion } from 'framer-motion';

const lowStockProducts = [
    {
        id: 1,
        name: "Bandages (Pack of 10)",
        image: "https://cdn.pixabay.com/photo/2017/08/06/00/47/bandage-2583622_1280.jpg",
        stock: 4
    },
    {
        id: 2,
        name: "Pain Relief Gel",
        image: "https://cdn.pixabay.com/photo/2020/03/26/18/07/gel-4971452_1280.jpg",
        stock: 6
    },
    {
        id: 3,
        name: "Blood Pressure Monitor",
        image: "https://cdn.pixabay.com/photo/2014/12/10/20/56/blood-pressure-563213_1280.jpg",
        stock: 2
    }
];

const LowStockAlerts = () => {
    return (
        <motion.div
            className="bg-white p-5 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-lg font-semibold text-dark-color mb-4">Low Stock Alerts</h3>
            <div className="space-y-4">
                {lowStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                            <div>
                                <p className="font-medium text-sm text-dark-color">{product.name}</p>
                                <p className="text-xs text-gray-500">Only {product.stock} left in stock</p>
                            </div>
                        </div>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                            Low Stock
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default LowStockAlerts;
