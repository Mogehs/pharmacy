import React, { useState } from "react";
import EditProductOverlay from "./EditProductOverlay";
import DeleteProductConfirmation from "./DeleteProductConfirmation";
import AddProductOverlay from "./AddProductOverlay";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../features/productsApi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Products = () => {
  const { data: products = [], isLoading, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleDeleteConfirmation = (product) => {
    setSelectedProduct(product);
    setIsDeleting(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      let res = await deleteProduct(productId);
      if (res.data.success == true) {
        return toast.success(res.data.message);
      } else {
        return toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveProduct = () => {
    setIsEditing(false);
    refetch();
  };

  const handleAddProduct = () => {
    setIsAdding(false);
    refetch();
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mt-6 max-w-full overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h3 className="text-2xl font-semibold text-dark-color tracking-wide">
          🛒 Product Management
        </h3>
        <motion.button
          onClick={() => setIsAdding(true)}
          whileHover={{
            scale: 1.08,
            backgroundColor: "#ffffff",
            color: "#00B8A9",
            borderColor: "#00B8A9",
            boxShadow: "0px 0px 12px rgba(168, 117, 77, 0.4)",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="px-6 py-2 text-sm font-medium cursor-pointer border border-[#00B8A9] bg-[#00B8A9] text-white rounded-full shadow-md"
        >
          ➕ Add New Product
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-color transition"
          placeholder="🔍 Search products by title, id or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-lg border-1 border-neutral-300">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4 text-nowrap">Image</th>
              <th className="p-4 text-nowrap">Title</th>
              <th className="p-4 text-nowrap">Category</th>
              <th className="p-4 text-nowrap">Price</th>
              <th className="p-4 text-nowrap">Stock</th>
              <th className="p-4 text-center text-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  Loading products...
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 text-nowrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 text-nowrap">{product.name}</td>
                  <td className="px-4 py-2 text-nowrap">{product.category}</td>
                  <td className="px-4 py-2 text-nowrap">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-nowrap">{product.stock}</td>
                  <td className="flex justify-center items-center px-4 py-2 space-x-3 mt-5">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-4 py-2 text-sm rounded-full text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(product)}
                      className="px-4 py-2 text-sm rounded-full text-white bg-red-500 hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Overlays */}
      {isEditing && selectedProduct && (
        <EditProductOverlay
          product={selectedProduct}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveProduct}
        />
      )}

      {isDeleting && selectedProduct && (
        <DeleteProductConfirmation
          product={selectedProduct}
          onClose={() => setIsDeleting(false)}
          onDelete={() => handleDeleteProduct(selectedProduct._id)}
        />
      )}

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
