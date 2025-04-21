import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseTitle: String,
  status: {
    type: String,
    enum: ["applied", "approved", "rejected"],
    default: "applied",
  },
  dateApplied: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
