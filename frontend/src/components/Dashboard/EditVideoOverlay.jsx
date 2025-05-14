import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const EditVideoOverlay = ({ video, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (video) {
      setValue("title", video.title || "");
      setValue("link", video.link || "");
      setValue("description", video.description || "");
      setValue("category", video.category || "");
    }
  }, [video, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onSave(data, video._id);
      onClose();
    } catch (error) {
      console.error("Error updating video:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center px-2">
      <motion.div
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-4 md:p-6 overflow-y-auto max-h-[90vh]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-[#00B8A9] mb-4">
          ✏️ Edit Video
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>Title</label>
              <input
                placeholder="Title *"
                {...register("title", { required: "Title is required" })}
                className="border p-2 rounded w-full"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div>
              <label>Video Link</label>

              <input
                placeholder="Video Link *"
                {...register("link", { required: "Video link is required" })}
                className="border p-2 rounded w-full"
              />
              {errors.link && (
                <span className="text-red-500 text-sm">
                  {errors.link.message}
                </span>
              )}
            </div>

            <div>
              <label>Category</label>

              <input
                placeholder="Category"
                {...register("category")}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="sm:col-span-2">
              <label>Description</label>

              <textarea
                placeholder="Description *"
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                className="border p-2 rounded w-full"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-gray-400" : "bg-[#00B8A9] hover:bg-[#009688]"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditVideoOverlay;
