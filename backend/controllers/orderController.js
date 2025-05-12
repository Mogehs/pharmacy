import Order from "../models/Order.js";

// Create a new order (after Stripe session created)
export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, paymentIntentId, shippingAddress } =
      req.body;
    const userId = req.user._id;

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      paymentIntentId,
      shippingAddress,
      paymentMethod: "Stripe",
      isPaid: false,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// Get all orders (admin usage or filter)
export const getAllOrders = async (req, res) => {
  try {
    if (!req.user.role == "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const orders = await Order.find()
      .populate("user")
      .populate("items.product");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Get orders of logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const orders = await Order.find({ user: userId })
      .populate("items.product") // ✅ Matches the schema correctly
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch your orders", error });
  }
};

// Get single order by ID (user or admin)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("products.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const userId = req.user._id;
    if (!order.user._id.equals(userId) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    if (!req.user.role == "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { status } = req.body;

    if (!["Preparing Package", "Ready To Ship", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("items.product")
      .populate("user");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

export const markOrderAsPaid = async (req, res) => {
  try {
    const { paymentIntentId, paymentResult } = req.body;

    const order = await Order.findOne({ paymentIntentId });

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = paymentResult;

    await order.save();

    res.status(200).json({ message: "Order marked as paid", order });
  } catch (error) {
    console.error("Error marking order as paid:", error);
    res.status(500).json({ message: "Failed to mark order as paid", error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ message: "Server error while deleting order" });
  }
};
