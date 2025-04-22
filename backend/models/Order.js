import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    paymentMethod: String,
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
