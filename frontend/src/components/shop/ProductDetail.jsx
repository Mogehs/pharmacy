import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const products = useSelector((state) => state.shop.filteredProducts);

    const product = products.find((p) => p.id.toString() === id);

    if (!product) {
        return (
            <div className="p-6 text-center text-red-500 font-semibold">
                Product not found.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-64 h-64 object-cover rounded-lg border"
                />
                <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold text-dark-color">{product.title}</h2>
                    <p className="text-md text-gray-700">Category: <span className="font-semibold">{product.category}</span></p>
                    <p className="text-md text-gray-700">Stock: {product.stock}</p>
                    <p className="text-lg font-semibold text-primary-color">₹ {product.price}</p>
                    <button className="mt-4 px-5 py-2 bg-primary-color text-white rounded hover:bg-opacity-90 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
