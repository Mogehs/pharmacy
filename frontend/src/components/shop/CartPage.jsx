import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/shop/CartSlice";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";

const CartPage = () => {
    // Get cart items from the Redux store, defaulting to an empty array if undefined
    const cartItems = useSelector((state) => state.cart.cartItems || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuantityChange = (id, qty) => {
        if (qty < 1) return;
        dispatch(updateQuantity({ id, quantity: qty }));
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    // Calculate the total price, using reduce with a fallback for empty cart
    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <>
            <div className="w-full min-h-screen bg-dk text-txt-lt">
                <div className="w-[90vw] mx-auto flex flex-col lg:flex-row justify-around py-10 gap-8">
                    {/* Cart Section */}
                    <div className="w-full lg:w-[70%] p-6 bg-lt text-black rounded-lg shadow">
                        <div className="flex justify-between items-center pb-6 border-b border-gray-300">
                            <h1 className="text-3xl font-semibold txt-gd">Shopping Cart</h1>
                            <span className="text-lg font-medium">{cartItems.length} items</span>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-600">Your cart is empty.</p>
                        ) : (
                            <>
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row justify-between items-center py-4 border-b border-gray-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="font-semibold">{item.title}</h3>
                                                <p className="text-sm text-gray-700">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mt-3 sm:mt-0">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) =>
                                                    handleQuantityChange(item.id, parseInt(e.target.value))
                                                }
                                                className="w-16 px-2 py-1 border border-gray-300 rounded"
                                            />
                                        </div>

                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 text-sm mt-3 sm:mt-0"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}

                        <div
                            onClick={() => navigate("/products")}
                            className="flex items-center mt-6 gap-2 font-semibold cursor-pointer txt-gl hover-gl"
                        >
                            <FaArrowLeftLong />
                            <span>Back to Shop</span>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="w-full lg:w-[30%] p-6 bg-lt text-black rounded-lg shadow">
                        <h2 className="text-2xl font-bold mb-4 border-b pb-4 border-gray-300 txt-gd">
                            Summary
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-lg font-medium mb-2">Shipping</label>
                                <select className="w-full border border-gray-300 px-3 py-2 rounded bg-white outline-none">
                                    <option value="" disabled hidden>Standard Delivery</option>
                                    <option value="5">Standard $5</option>
                                    <option value="2">2 Days</option>
                                    <option value="3">3 Days</option>
                                    <option value="4">4 Days</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-lg font-medium mb-2">Address</label>
                                <textarea
                                    className="w-full border border-gray-300 px-3 py-2 rounded outline-none"
                                    placeholder="Enter your address"
                                />
                            </div>

                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button className="w-full bg-black text-white py-3 font-bold rounded hover:bg-gray-800 transition duration-200">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CartPage;
