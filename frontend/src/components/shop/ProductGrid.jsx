import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaRegEye } from "react-icons/fa";
import { useGetProductsQuery } from "../features/productsApi";
import { useSelector } from "react-redux";

const ProductGrid = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const category = useSelector((state) => state.product.category);
  const price = useSelector((state) => state.product.price);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const navigate = useNavigate();
  const [minPrice, maxPrice] = price;

  useEffect(() => {
    setCurrentPage(0);
  }, [category, price]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesPrice = product.price >= minPrice || product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const handleViewProduct = (productId) => navigate(`/product/${productId}`);

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load products.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 flex-1 px-4 py-5 text-dark-color">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.map((product) => (
          <div
            key={product._id}
            className="border border-light-color bg-white rounded-lg p-2  shadow-sm group transition hover:border-dark-color"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-2 rounded transition-transform duration-500 ease-in-out group-hover:scale-95"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                <button
                  onClick={() => handleViewProduct(product._id)}
                  className="bg-medium-color text-white p-3 rounded-md bg-black cursor-pointer hover:bg-black transition duration-300 flex items-center gap-2"
                >
                  <FaRegEye />
                  <span>View Product</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <h3 className="text-sm font-semibold mb-1">{product.name}</h3>
            <p className="text-medium-color font-semibold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center flex-wrap gap-2 mt-6"
        pageClassName="text-sm text-dark-color bg-light-color border border-dark-color rounded-lg px-4 py-2 hover:bg-highlight hover:text-black transition-all duration-200 cursor-pointer"
        activeClassName="bg-medium-color text-dark-color font-semibold border-highlight"
        previousClassName="text-sm bg-white text-dark-color border border-medium-color rounded-lg px-3 py-2 hover:bg-highlight hover:text-black transition-all duration-200 cursor-pointer"
        nextClassName="text-sm bg-white text-dark-color border border-medium-color rounded-lg px-3 py-2 hover:bg-highlight hover:text-black transition-all duration-200 cursor-pointer"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default ProductGrid;
