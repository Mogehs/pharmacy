import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/shop/CartSlice";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import { increaseProductStock } from "../../store/shop/ShopSlice";

const CartPage = () => {
    // Get cart items from the Redux store, defaulting to an empty array if undefined
    const cartItems = useSelector((state) => state.cart.cartItems || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.shop.filteredProducts);

    const handleQuantityChange = (id, qty) => {
        const product = products.find(p => p.id === id); // Find the product
        const cartItem = cartItems.find(item => item.id === id); // Find the cart item

        if (!product || !cartItem) return; // If no product or cart item found, exit
        const maxQuantity = cartItem.stock;

        if (qty < 1) return; // Prevent less than 1
        if (qty > maxQuantity) return; // Prevent exceeding available + cart quantity

        dispatch(updateQuantity({ id, quantity: qty }));
    };




    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        dispatch(increaseProductStock(id));
    };

    // Calculate the total price, using reduce with a fallback for empty cart
    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <>
            <div className="w-full min-h-screen bg-[#E8F6F3] text-[#2E3A59]">
                <div className="w-[90vw] mx-auto flex flex-col lg:flex-row justify-around py-10 gap-8">

                    {/* Cart Section */}
                    <div className="w-full lg:w-[70%] p-6 bg-white text-[#2E3A59] rounded-lg shadow-md">
                        <div className="flex justify-between items-center pb-6 border-b border-[#00B8A9]">
                            <h1 className="text-3xl font-bold text-[#00B8A9]">Shopping Cart</h1>
                            <span className="text-lg font-medium">{cartItems.length} items</span>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-500 mt-4">Your cart is empty.</p>
                        ) : (
                            <>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center py-4 border-b border-gray-200">
                                        <div className="flex items-center gap-4 flex-1">
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                            <div className="flex flex-col">
                                                <h3 className="font-semibold">{item.title}</h3>
                                                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 sm:flex-row flex-col">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="text-2xl text-[#00B8A9] disabled:opacity-30"
                                                >
                                                    <CiCircleMinus />
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    min="1"
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                                                />

                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    className="text-2xl text-[#00B8A9] disabled:opacity-30"
                                                >
                                                    <CiCirclePlus />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="text-[#FF6B6B] text-sm font-semibold mt-2 sm:mt-0"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        <div
                            onClick={() => navigate("/products")}
                            className="flex items-center mt-6 gap-2 font-semibold cursor-pointer text-[#00B8A9] hover:text-[#0C2D48]"
                        >
                            <FaArrowLeftLong />
                            <span>Back to Shop</span>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="w-full lg:w-[30%] p-6 bg-white text-[#2E3A59] rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 border-b pb-4 border-[#00B8A9]">
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

                            <button className="w-full bg-[#00B8A9] text-white py-3 font-bold rounded hover:bg-[#009688] transition duration-200">
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
