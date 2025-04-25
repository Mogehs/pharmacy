import React, { useState } from "react";
import { CiHeart, CiYoutube } from "react-icons/ci";
import { IoCameraReverse } from "react-icons/io5";
import { MdOutlineAllInbox } from "react-icons/md";
import { TiDropbox } from "react-icons/ti";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

const Alpha = () => {
    const [increment, setincrement] = useState();
    const [value, setvalue] = useState(1);

    const Increment = () => {
        setvalue(value + 1);
    }

    const Decrement = () => {
        if (value > 1) {
            setvalue(value - 1);

        }
    }
    const ADoCart = () => {
        console.log(value);
    }


    return (
        <div className="flex justify-center flex-wrap gap-2">
            {/* First big img */}
            <div className="w-[100%] md:w-[63%] h-[400px]">
                <img
                    src="https://images.unsplash.com/photo-1743620658006-a90dd7e1ebd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"
                    className="w-full h-full object-cover bg-center rounded-lg cursor-pointer"
                    alt="img"
                />
            </div>

            {/* text */}
            <div className="w-[100%] md:w-[35%]  p-3">
                <div className="flex flex-col gap-3 border-b border-gray-300 py-4">
                    <h1 className="text-2xl font-bold">Alya Skin Pink Clay Mask</h1>
                    <p>
                        ⭐⭐⭐⭐⭐ <span>(1 customer review)</span>
                    </p>
                </div>

                <div className="border-b border-gray-300 py-4">
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center">
                            <IoIosCheckmark />3 cleaning programs
                        </li>
                        <li className="flex items-center">
                            <IoIosCheckmark />3 cleaning programs
                        </li>
                        <li className="flex items-center">
                            <IoIosCheckmark />3 cleaning programs
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-5 py-4 border-b border-gray-300">
                    <h1 className="text-2xl font-bold">$767686</h1>
                    <div className="w-full flex  flex-col gap-2 p-3 bg-gray-100 rounded-sm">
                        <div className="flex justify-between  items-center">
                            <div className="flex items-center gap-2 text-xl">
                                <CiCircleMinus className="cursor-pointer"
                                    onClick={Decrement}
                                />
                                <span className="w-10 text-center">{value}</span>
                                <CiCirclePlus className="cursor-pointer"
                                    onClick={Increment}
                                />
                            </div>
                            <div className="px-5 py-2 bg-blue-400 hover:bg-blue-300 text-white font-semibold cursor-pointer rounded-sm"
                                onClick={ADoCart}
                            >Add To Cart</div>
                        </div>
                        <div className="w-full bg-red-500 hover:bg-red-400 py-2 font-semibold text-white rounded-sm cursor-pointer text-center">Buy now</div>
                    </div>
                    <p>Out of Stock</p>

                    <div className="flex w-full flex-wrap gap-4">
                        <div className="flex gap-2 items-center">
                            <CiHeart className="text-3xl text-blue-800" />
                            <span className="text-sm">Add to wishlist</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <IoCameraReverse className="text-3xl text-blue-800" />
                            <span className="text-sm">Add to Compare</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MdOutlineAllInbox className="text-3xl text-blue-800" />
                            <span className="text-sm">Ask About Product</span>
                        </div>
                    </div>

                    <div className="w-full bg-blue-100 p-2 text-blue-900 font-bold flex justify-between items-center rounded">
                        <TiDropbox className="text-2xl" />
                        <h1>Add 15 products to cart and get $10 discount</h1>
                    </div>
                </div>

                <div className="border-b py-3 border-gray-300">
                    <ul className="flex flex-col gap-1">
                        <li>
                            <span className="text-blue-900 font-semibold">SKU:</span> 10002498
                        </li>
                        <li>
                            <span className="text-blue-900 font-semibold">Category:</span>{" "}
                            Personal Care
                        </li>
                        <li>
                            <span className="text-blue-900 font-semibold">Tag:</span> Mask
                        </li>
                    </ul>
                </div>

                <div className="flex flex-wrap gap-5 py-5">
                    <span className="px-2 cursor-pointer py-2 text-blue-500 bg-gray-200 rounded-full">
                        <FaFacebookF />
                    </span>
                    <span className="px-2 cursor-pointer py-2 text-blue-500 bg-gray-200 rounded-full">
                        <FaLinkedinIn />
                    </span>
                    <span className="px-2 cursor-pointer py-2 text-green-700 bg-gray-200 rounded-full">
                        <FaWhatsapp />
                    </span>
                    <span className="px-2 cursor-pointer py-2 text-blue-600 bg-gray-200 rounded-full">
                        <FaTelegramPlane />
                    </span>
                    <span className="px-2 cursor-pointer py-2 text-red-500 bg-gray-200 rounded-full">
                        <CiYoutube />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Alpha;