import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    coverImagePublicId: { type: String, required: true },
    courseOverview: { type: String },
    courseOutline: { type: String },
    customerReviews: { type: [String] },
    courseLevel: { type: String },
    courseDuration: { type: String },
    lessons: { type: Number },
    quizes: { type: Number },
    language: { type: String },
    courseLink: { type: String },
    price: { type: Number, default: 0 },
    instructor: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
