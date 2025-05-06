import React, { useState } from "react";
import { motion } from "framer-motion";

const AddCourseOverlay = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseCoverImg: null,
    courseOverview: "",
    courseOutline: "",
    courseLevel: "",
    courseDuration: "",
    lessons: 0,
    quizes: 0,
    language: "English",
    courseLink: "",
    isFree: false,
    price: 0,
    instructor: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async () => {
    const { title, courseCoverImg, courseLink, instructor } = formData;

    if (!title || !courseCoverImg || !courseLink || !instructor) return;

    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("courseCoverImg", formData.courseCoverImg);
      data.append("courseOverview", formData.courseOverview);
      data.append("courseOutline", formData.courseOutline);
      data.append("courseLevel", formData.courseLevel);
      data.append("courseDuration", formData.courseDuration);
      data.append("lessons", formData.lessons.toString());
      data.append("quizes", formData.quizes.toString());
      data.append("language", formData.language);
      data.append("courseLink", formData.courseLink);
      data.append("isFree", formData.isFree.toString());
      data.append("price", formData.isFree ? "0" : formData.price.toString());
      data.append("instructor", formData.instructor);

      await onAdd(data);

      onClose();
    } catch (error) {
      console.error("Error adding course:", error);
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
          ➕ Add New Course
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Title *"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <div>
            <input
              name="courseCoverImg"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            {formData.courseCoverImg && (
              <img
                src={URL.createObjectURL(formData.courseCoverImg)}
                alt="Cover Preview"
                className="mt-2 h-32 object-cover rounded"
              />
            )}
          </div>

          <input
            name="courseLink"
            placeholder="Course Link *"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="instructor"
            placeholder="Instructor *"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="courseLevel"
            placeholder="Course Level"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="courseDuration"
            placeholder="Course Duration"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="language"
            placeholder="Language"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="lessons"
            type="number"
            placeholder="Lessons"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            name="quizes"
            type="number"
            placeholder="Quizzes"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              type="checkbox"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
            />
            <label htmlFor="isFree" className="text-sm">
              Is Free?
            </label>
          </div>

          {!formData.isFree && (
            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              className="border p-2 rounded w-full sm:col-span-2"
            />
          )}

          <textarea
            name="description"
            placeholder="Description"
            rows={2}
            onChange={handleChange}
            className="border p-2 rounded w-full sm:col-span-2"
          />
          <textarea
            name="courseOverview"
            placeholder="Course Overview"
            rows={2}
            onChange={handleChange}
            className="border p-2 rounded w-full sm:col-span-2"
          />
          <textarea
            name="courseOutline"
            placeholder="Course Outline"
            rows={2}
            onChange={handleChange}
            className="border p-2 rounded w-full sm:col-span-2"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 ${
              loading ? "bg-gray-400" : "bg-[#00B8A9]"
            } text-white rounded hover:${loading ? "" : "bg-[#009688]"}`}
            disabled={loading}
          >
            {loading ? (
              <div className="loader"></div> // Add a loader here (e.g., spinner)
            ) : (
              "Add"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddCourseOverlay;
