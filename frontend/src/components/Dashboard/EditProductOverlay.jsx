import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUpdateProductMutation } from "../features/productsApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductOverlay = ({ product, onClose }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  const [previewImages, setPreviewImages] = useState([]);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    setEditedProduct(product);
    setPreviewImages(product.images || []);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
    setEditedProduct((prev) => ({ ...prev, images: previews }));
  };

  const handleSave = async () => {
    const toastId = toast.loading("Updating product...");

    try {
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("description", editedProduct.description);
      formData.append("price", editedProduct.price);
      formData.append("stock", editedProduct.stock);
      formData.append("category", editedProduct.category);

      if (document.querySelector('input[type="file"]').files.length > 0) {
        Array.from(document.querySelector('input[type="file"]').files).forEach(
          (file) => formData.append("productImages", file)
        );
      }

      await updateProduct({
        id: editedProduct._id,
        formData, // Pass the FormData object
      }).unwrap();

      toast.update(toastId, {
        render: "Product updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      onClose();
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to update product.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      console.error(error);
    }
  };
  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-[95%] md:w-[90%] lg:w-[950px] max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Edit Product
        </h3>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Fields */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Title
              </label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editedProduct.stock}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Upload Images (Max 4)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Right Side: Image Previews */}
          <div className="flex flex-wrap gap-4 justify-center w-full md:w-[300px]">
            {previewImages.length > 0 ? (
              previewImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-[140px] h-[140px] object-cover rounded-md border shadow"
                />
              ))
            ) : (
              <div className="text-gray-500 text-sm w-full text-center">
                No images selected
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditProductOverlay;
