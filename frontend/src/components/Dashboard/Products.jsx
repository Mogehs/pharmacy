// components/admin/ProductsTable.js
import React, { useState } from "react";
import EditProductOverlay from "./EditProductOverlay";
import DeleteProductConfirmation from "./DeleteProductConfirmation";
import { motion } from "framer-motion";
import AddProductOverlay from "./AddProductOverlay";

const products = [
    { id: "P001", title: "Vitamin C", category: "Supplements", price: 10.99, stock: 150 },
    { id: "P002", title: "Blood Pressure Monitor", category: "Devices", price: 49.99, stock: 30 },
    { id: "P003", title: "Pain Relief Gel", category: "Pain Relief", price: 12.49, stock: 200 },
    { id: "P004", title: "Diabetes Care Kit", category: "Diabetes Care", price: 29.99, stock: 100 },
    { id: "P005", title: "Personal Care Shampoo", category: "Personal Care", price: 8.99, stock: 300 },
];

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [productsList, setProductsList] = useState(products);
    const [isAdding, setIsAdding] = useState(false);

    // Filter products by search term
    const filteredProducts = productsList.filter(
        (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    const handleDeleteProduct = (productId) => {
        setProductsList((prev) => prev.filter((product) => product.id !== productId));
        setIsDeleting(false);
    };

    const handleDeleteConfirmation = (product) => {
        setSelectedProduct(product);
        setIsDeleting(true); // Set the product to be deleted
    };

    const handleSaveProduct = (editedProduct) => {
        setProductsList((prev) =>
            prev.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
            )
        );
        setIsEditing(false);
    };

    const handleAddProduct = (product) => {
        setProductsList((prev) => [product, ...prev]);
    };


    return (
        <motion.div
            className="bg-white rounded-xl shadow-xl p-6 mt-6 max-w-full overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >

            <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-[18px] md:text-2xl font-bold mb-6 text-dark-color tracking-wide">
                    🛒 Products Management
                </h3>
                <motion.button
                    onClick={() => setIsAdding(true)}
                    whileHover={{
                        scale: 1.08,
                        backgroundColor: "#ffffff",
                        color: "#a8754d",
                        borderColor: "#a8754d",
                        boxShadow: "0px 0px 12px rgba(168, 117, 77, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="px-4 text-sm py-1 cursor-pointer border border-[#a8754d] bg-[#a8754d] text-white rounded-full"
                >
                    ➕ Add New Product
                </motion.button>
            </div>


            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-color transition"
                    placeholder="🔍 Search products by title, id or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
                <table className="w-full text-sm text-left table-auto">
                    <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
                        <tr>
                            <th className="p-3 text-nowrap">Product ID</th>
                            <th className="p-3 text-nowrap">Title</th>
                            <th className="p-3 text-nowrap">Category</th>
                            <th className="p-3 text-nowrap">Price</th>
                            <th className="p-3 text-nowrap">Stock</th>
                            <th className="p-3 text-center text-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className={`transition duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100`}
                                >
                                    <td className="px-3 py-2 text-nowrap">{product.id}</td>
                                    <td className="px-3 py-2 text-nowrap">{product.title}</td>
                                    <td className="px-3 py-2 text-nowrap">{product.category}</td>
                                    <td className="px-3 py-2 text-nowrap">  ${!isNaN(Number(product.price)) ? Number(product.price).toFixed(2) : '0.00'}</td>
                                    <td className="px-3 py-2 text-nowrap">{product.stock}</td>
                                    <td className="flex items-center px-3 py-2 text-center space-x-2">
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="text-sm px-6 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition text-nowrap"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteConfirmation(product)}
                                            className="text-sm px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 transition text-nowrap"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-400 italic">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Product Overlay */}
            {isEditing && selectedProduct && (
                <EditProductOverlay
                    product={selectedProduct}
                    onClose={() => setIsEditing(false)}
                    onSave={handleSaveProduct}
                />
            )}

            {/* Delete Product Confirmation */}
            {isDeleting && selectedProduct && (
                <DeleteProductConfirmation
                    product={selectedProduct}
                    onClose={() => setIsDeleting(false)}
                    onDelete={handleDeleteProduct}
                />
            )}

            {/* Add new product Overlay */}
            {isAdding && (
                <AddProductOverlay
                    onClose={() => setIsAdding(false)}
                    onAdd={handleAddProduct}
                />
            )}

        </motion.div>

    );
};

export default Products;
