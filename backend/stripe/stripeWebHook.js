import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
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
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata || {};

    try {
      if (metadata.type === "order") {
        const order = await Order.findById(metadata.orderId);
        if (order) {
          order.isPaid = true;
          order.paidAt = new Date();
          order.paymentResult = {
            id: session.id,
            status: session.payment_status,
            update_time: new Date().toISOString(),
            email_address: session.customer_email,
          };
          await order.save();

          await Cart.findOneAndDelete({ userId: order.user });
        }
      } else if (metadata.type === "course") {
        const { userId, courseId } = metadata;
        if (userId && courseId) {
          await User.findByIdAndUpdate(userId, {
            $addToSet: { purchasedCourses: courseId },
          });
        }
      }
    } catch (err) {
      console.error("Error processing webhook:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.json({ received: true });
};
