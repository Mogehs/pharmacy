import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    authorizations: {
      type: [String],
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    guardianFirst: {
      type: String,
      required: true,
    },
    guardianLast: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
