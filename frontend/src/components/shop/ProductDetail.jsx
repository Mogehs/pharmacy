import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/shop/CartSlice";



import { CiHeart, CiYoutube } from "react-icons/ci";
import { IoCameraReverse } from "react-icons/io5";
import { MdOutlineAllInbox } from "react-icons/md";
import { TiDropbox } from "react-icons/ti";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import StarRating from "./StarRating";
import RelatedProductsCarousel from "./RelatedProductCarousal";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector((state) => state.shop.filteredProducts);
    const product = products.find((p) => p.id.toString() === id);

    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (!product) {
        return <div className="p-6 text-center text-red-500 font-semibold">Product not found.</div>;
    }

    console.log("Product is..", product);

    return (
        <div className="flex justify-center flex-wrap gap-4 p-6">
            {/* Left Image Section */}
            <div className="w-full md:w-[63%] space-y-4">
                {/* Image Wrapper */}
                <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden rounded-xl shadow-lg group">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Optional overlay (for caption or contrast) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg px-1">
                    {product.description}
                </p>
            </div>



            {/* Right Details Section */}
            <div className="w-full md:w-[35%] p-3">
                <div className="flex flex-col gap-3 border-b border-gray-300 py-4">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <div className="flex items-center gap-2">
                        <StarRating rating={product.rating} />
                        <span className="text-sm text-gray-600">({product.numReviews} customer reviews)</span>
                    </div>

                </div>

                <div className="border-b border-gray-300 py-4">
                    <ul className="flex flex-col gap-3 text-gray-700">
                        <li className="flex items-center gap-2"><IoIosCheckmark /> Original Quality</li>
                        <li className="flex items-center gap-2"><IoIosCheckmark /> Fast Delivery</li>
                        <li className="flex items-center gap-2"><IoIosCheckmark /> Secure Packaging</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-5 py-4 border-b border-gray-300">
                    <h1 className="text-2xl font-bold text-primary-color">₹ {product.price}</h1>

                    <div className="w-full flex flex-col gap-2 p-3 rounded-sm">
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="px-4 text-sm py-2 cursor-pointer border border-[#a8754d] 
             hover:text-[#a8754d] hover:bg-white bg-[#a8754d] text-white 
             rounded-full transition-all duration-600 ease-in-out mt-4">
                            Add to Cart
                        </button>
                    </div>

                    <p className="text-red-600 font-medium">
                        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                    </p>

                    {/* Actions Row */}
                    {/* <div className="flex w-full flex-wrap gap-4 text-blue-800">
                        <div className="flex gap-2 items-center">
                            <CiHeart className="text-3xl" />
                            <span className="text-sm">Add to wishlist</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <IoCameraReverse className="text-3xl" />
                            <span className="text-sm">Compare</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MdOutlineAllInbox className="text-3xl" />
                            <span className="text-sm">Ask About Product</span>
                        </div>
                    </div> */}

                    {/* Discount Info */}
                    {/* <div className="w-full bg-blue-100 p-2 text-blue-900 font-bold flex justify-between items-center rounded">
                        <TiDropbox className="text-2xl" />
                        <h1>Add 15 products to cart and get ₹100 discount</h1>
                    </div> */}
                </div>

                {/* Info Tags */}
                <div className="border-b py-3 border-gray-300 text-sm">
                    <ul className="flex flex-col gap-1">
                        <li><span className="text-blue-900 font-semibold">SKU:</span> #{product.id}</li>
                        <li><span className="text-blue-900 font-semibold">Category:</span> {product.category}</li>
                        <li><span className="text-blue-900 font-semibold">Tag:</span> Health</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex flex-wrap gap-4 py-5">
                    <span className="px-2 py-2 text-blue-500 bg-gray-200 rounded-full cursor-pointer"><FaFacebookF /></span>
                    <span className="px-2 py-2 text-blue-500 bg-gray-200 rounded-full cursor-pointer"><FaLinkedinIn /></span>
                    <span className="px-2 py-2 text-green-700 bg-gray-200 rounded-full cursor-pointer"><FaWhatsapp /></span>
                    <span className="px-2 py-2 text-blue-600 bg-gray-200 rounded-full cursor-pointer"><FaTelegramPlane /></span>
                    <span className="px-2 py-2 text-red-500 bg-gray-200 rounded-full cursor-pointer"><CiYoutube /></span>
                </div>
            </div>
            <RelatedProductsCarousel />
        </div>
    );
};

export default ProductDetail;
