import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from "../features/cartApi";
import { useSelector } from "react-redux";
import { useCreateCheckoutSessionMutation } from "../features/stripeApi";
import { toast } from "react-toastify";

const CartPage = () => {
  const { data: cartItems, isLoading: cartLoading } = useGetCartQuery();
  const user = useSelector((state) => state.user.user);
  const [updateCartItem] = useUpdateCartMutation();
  const [removeCartItem] = useRemoveFromCartMutation();
  const [clearCartMutation] = useClearCartMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const [shippingAddress, setShippingAddress] = useState({
    address: user?.address || "",
    address2: "",
    city: "",
    postalCode: "",
  });

  const [checkLoad, setCheckLoad] = useState(false);
  const [clearLoading, setClearLoading] = useState(false); // ✅
  const [removingItemId, setRemovingItemId] = useState(null); // ✅

  const userId = user?._id;

  const totalPrice = cartItems?.products?.reduce(
    (acc, item) => acc + item?.productId?.price * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    updateCartItem({ id: item._id, quantity: item.quantity + 1 });
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartItem({ id: item._id, quantity: item.quantity - 1 });
    }
  };

  const handleRemoveFromCart = async (item) => {
    setRemovingItemId(item._id); // ✅
    try {
      await removeCartItem(item._id);
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleClearCart = async () => {
    setClearLoading(true);
    try {
      await clearCartMutation().unwrap();
    } finally {
      setClearLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    const { address, city, postalCode } = shippingAddress;

    if (!address.trim() || !city.trim() || !postalCode.trim()) {
      toast.error("Please fill in all required shipping address fields.");
      return;
    }

    try {
      setCheckLoad(true);
      const items = cartItems.products.map((item) => ({
        productId: item?.productId?._id,
        quantity: item?.quantity,
        productName: item?.productId?.name,
        price: item?.productId?.price,
        image: item?.productId?.image,
      }));

      const { data } = await createCheckoutSession({
        userId,
        items,
        shippingAddress,
      });

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setCheckLoad(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center">
        <p className="text-lg font-medium text-dark-color">Loading cart...</p>
      </div>
    );
  }

  if (!cartItems || cartItems?.products?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center mt-10 h-[100dvh] px-4">
        <div className="text-6xl mb-6 animate-bounce text-[#ff9800]">🛒</div>
        <h2 className="text-4xl font-bold mb-4 font-fredoka text-dark-color text-center">
          Your Cart is Empty
        </h2>
        <p className="text-lg text-medium-color mb-6 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our
          collection and add your favorite items to get started.
        </p>
        <Link
          to="/home"
          className="bg-medium-color text-white px-8 py-4 rounded-md hover:bg-dark-color transition-all font-fredoka text-lg mt-6 cursor-pointer"
        >
          ⤺ Return to Home
        </Link>
        <p className="text-sm text-gray-400 mt-4">
          Need help? Contact our customer support.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 sm:px-6 md:px-20 min-h-screen mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 overflow-x-auto">
            <div className="w-full overflow-auto">
              <table className="min-w-[600px] w-full shadow-md rounded overflow-hidden">
                <thead className="bg-light-color text-sm uppercase text-dark-color hidden sm:table-header-group">
                  <tr>
                    <th className="text-left p-4 w-30">Product</th>
                    <th className="text-left p-4 w-30">Price</th>
                    <th className="text-left p-4 w-30">Quantity</th>
                    <th className="text-left p-4 w-30">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.products?.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-dark-color sm:table-row flex flex-col sm:flex-row gap-2 p-4 sm:p-0"
                    >
                      <td className="p-0 sm:p-4 flex items-center gap-4">
                        <img
                          src={item?.productId?.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover border rounded"
                        />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </td>
                      <td className="p-0 sm:p-4">
                        <span className="sm:hidden text-dark-color block text-xs mb-1">
                          Price
                        </span>
                        ${item?.productId?.price}
                      </td>
                      <td className="p-0 sm:p-4">
                        <span className="sm:hidden text-dark-color block text-xs mb-1">
                          Quantity
                        </span>
                        <div className="flex items-center border rounded px-3 py-1 w-max bg-light-color">
                          <button
                            onClick={() => handleDecrement(item)}
                            className="px-2 font-bold text-lg cursor-pointer"
                          >
                            −
                          </button>
                          <span className="px-3 w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(item)}
                            className="px-2 font-bold text-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-0 sm:p-4">
                        <span className="sm:hidden text-dark-color block text-xs mb-1">
                          Remove
                        </span>
                        <button
                          onClick={() => handleRemoveFromCart(item)}
                          disabled={removingItemId === item._id}
                          className={`text-dark-color hover:text-medium-color transition-all text-xl ${
                            removingItemId === item._id ? "opacity-50" : ""
                          } cursor-pointer`}
                        >
                          {removingItemId === item._id
                            ? "Removing..."
                            : "× Remove"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <button
                onClick={handleClearCart}
                disabled={clearLoading}
                className={`border border-dark-color px-6 py-2 rounded w-full md:w-auto transition-all cursor-pointer ${
                  clearLoading ? "opacity-50" : "hover:bg-light-color"
                }`}
              >
                {clearLoading ? "Clearing..." : "Clear Cart"}
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 p-8 rounded shadow-md space-y-6 ">
            <div>
              <div className="flex justify-between text-lg font-medium">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <hr className="my-3" />
            </div>

            {/* Shipping Form */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Shipping Address</h4>
              <form className="space-y-4 text-sm">
                <div>
                  <label htmlFor="address" className="block mb-2">
                    Address Line 1
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address2" className="block mb-2">
                    Address Line 2 (optional)
                  </label>
                  <input
                    id="address2"
                    type="text"
                    name="address2"
                    value={shippingAddress.address2}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block mb-2">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block mb-2">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </form>
              <hr className="my-4" />
            </div>

            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#00B8A9] text-white py-3 rounded hover:bg-medium-color text-sm font-semibold tracking-wide transition-all cursor-pointer"
              disabled={checkLoad}
            >
              {checkLoad ? "Proceeding..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
