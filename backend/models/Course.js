import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    videoURL: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isFree: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
