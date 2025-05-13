import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Stripe from "stripe";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    try {
      const order = await Order.findOne({
        totalPrice: session.amount_total / 100,
      });

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
    } catch (err) {
      console.error("Error processing order and clearing cart:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.json({ received: true });
};
