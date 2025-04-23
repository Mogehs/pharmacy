import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
    const products = useSelector((state) => state.shop.filteredProducts);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;

    const offset = currentPage * itemsPerPage;
    const currentItems = products.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const navigate = useNavigate();

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleCartClick = (productId) => {
        navigate(`/cart/${productId}`);
    };

    return (
        <div className="flex flex-col gap-8 flex-1 px-4 py-6 txt-lt">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentItems.map((product, index) => (
                    <div
                        key={index}
                        className="border border-light-color bg-white rounded-lg p-4 shadow-sm transition group hover:border-dark-color"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-60 object-contain mb-3 rounded transform transition-transform duration-500 ease-in-out group-hover:scale-95"
                            />

                            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                <div
                                    onClick={() => handleCartClick(product.id)}
                                    className="bg-medium-color p-3 rounded-md hover:bg-dark-color transition duration-300 cursor-pointer w-50"
                                >
                                    <div className="flex items-center justify-center gap-2 txt-lt">
                                        <FaRegEye />
                                        <span>View Product</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-sm font-semibold mb-1 txt-gd">{product.title}</h3>

                        <div className="txt-lt text-sm mb-1">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>{i < product.rating ? "★" : "☆"}</span>
                            ))}
                        </div>

                        <p className="txt-gl font-semibold">${product.price}</p>
                    </div>
                ))}
            </div>

            <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center flex-wrap gap-2 mt-6"
                pageClassName="text-sm txt-lt bg-lt border border-dark-color rounded-lg px-4 py-2 hover:bg-highlight hover:text-black transition-all duration-200 cursor-pointer"
                activeClassName="bg-medium-color txt-lt font-semibold border-highlight"
                previousClassName="text-sm bg-white txt-lt border border-medium-color rounded-lg px-3 py-2 hover:bg-highlight hover:text-black transition-all duration-200 cursor-pointer"
                nextClassName="text-sm bg-white txt-lt border border-medium-color rounded-lg px-3 py-2 hover:bg-highlight hover:text-black transition-all duration-200 cursor-pointer"
                disabledClassName="opacity-50 cursor-not-allowed"
            />
        </div>
    );
};

export default ProductGrid;
