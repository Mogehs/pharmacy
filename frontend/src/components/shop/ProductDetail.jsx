import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Loader2 } from "lucide-react";
import { FaShippingFast, FaShieldAlt, FaGift, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../features/productsApi";
import { useAddToCartMutation } from "../features/cartApi";
import RelatedProductsCarousel from "./RelatedProductCarousal";

const CartPage = () => {
  const { id } = useParams();
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [qty] = useState(1);

  useEffect(() => {
    if (products && id) {
      const foundProduct = products.find((p) => p._id.toString() === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.image);
      }
    }
  }, [products, id]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError || !product)
    return <div className="p-8 text-center">Product not found!</div>;

  const handleAddToCart = async () => {
    try {
      const response = await addToCart({
        productId: id,
        quantity: qty,
      }).unwrap();
      if (
        response?.products?.length >= 0 ||
        response?.message === "Product added to cart"
      ) {
        toast.success("Product added to cart successfully");
      } else {
        toast.warning("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Add to Cart Error:", error);
      toast.error(error?.data?.message || "Failed to add product to cart");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto text-dark-color">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
        {/* Product Images */}
        <div>
          <div className="mb-10">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[300px] sm:h-[400px] md:h-[335px] object-cover rounded-xl"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 sm:justify-start justify-center">
            {product?.images?.map((item, idx) => (
              <img
                key={idx}
                src={item}
                alt={item.title}
                onClick={() => setMainImage(item)}
                className="min-w-[60px] sm:min-w-[80px] h-16 sm:h-18 object-contain border rounded-md cursor-pointer hover:scale-105 hover:border-medium-color transition-transform duration-200 shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 my-4 h-fit">{product.description}</p>
          <hr className="mb-4" />
          <p className="text-2xl text-medium-color font-bold mb-4">
            ${product.price}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 w-full">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`${
                isAddingToCart ? "opacity-70 cursor-not-allowed" : ""
              } bg-[#00B8A9] hover:bg-medium-color text-white py-2 px-6 rounded flex items-center justify-center gap-2 w-full sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] transition-all duration-300`}
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> ADD TO CART
                </>
              )}
            </button>
            <button className="border p-2 rounded hover:bg-light-color w-full sm:w-12 md:w-16 lg:w-20 h-10 flex items-center justify-center transition-all duration-300">
              <Heart size={20} />
            </button>
          </div>

          <div className="border border-dashed p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-dark-color bg-white shadow-sm mt-10">
            <p className="flex items-center gap-2">
              <FaShippingFast size={20} /> Free home delivery on orders above
              Rs.999
            </p>
            <p className="flex items-center gap-2">
              <FaShieldAlt size={20} /> 100% genuine and verified medicines
            </p>
            <p className="flex items-center gap-2">
              <FaGift size={20} /> Exclusive discounts for registered patients
            </p>
            <p className="flex items-center gap-2">
              <FaUndo size={20} /> Hassle-free return on damaged products
            </p>
          </div>
        </div>
      </div>
      <RelatedProductsCarousel />
    </div>
  );
};

export default CartPage;
