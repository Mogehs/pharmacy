import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    // Cover image from Google Drive
    coverImage: {
      type: String, // URL (e.g., Drive link)
      required: true,
    },

    courseLink: {
      type: String,
      required: true,
    },

    // Indicates whether course is free
    isFree: {
      type: Boolean,
      default: false,
    },

    // Price if not free, default to 0
    price: {
      type: Number,
      default: 0,
    },

    // Instructor as input text (not ObjectId)
    instructor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
