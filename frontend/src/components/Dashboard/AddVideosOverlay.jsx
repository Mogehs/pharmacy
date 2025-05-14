import { useForm } from "react-hook-form";

export default function AddVideosOverlay({ onClose, onAdd }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onAdd(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center pt-24 z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Add New Video</h2>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Video Link */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="YouTube Video Link"
              {...register("link", { required: "Video link is required" })}
              className={`w-full px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                errors.link
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.link && (
              <p className="text-sm text-red-500">{errors.link.message}</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <textarea
              placeholder="Description"
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full px-4 py-2 text-sm border rounded-xl resize-none focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Category"
              {...register("category", { required: "Category is required" })}
              className={`w-full px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                errors.category
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-xl text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
