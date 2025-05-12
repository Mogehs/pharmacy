import Order from "../models/Order.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, orderId } = session.metadata;

    try {
      const order = await Order.findById(orderId);

      if (!order) {
        console.warn("Order not found for ID:", orderId);
        return res.status(404).json({ message: "Order not found" });
      }

      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: session.id,
        status: session.payment_status,
        update_time: new Date().toISOString(),
        email_address: session.customer_email,
      };

      await order.save();

      await Cart.findOneAndDelete({ userId });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.json({ received: true });
};
