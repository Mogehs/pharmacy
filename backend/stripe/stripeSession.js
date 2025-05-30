import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.params.id;
    const { items, shippingAddress } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const newOrder = await Order.create({
      user: userId,
      items: items.map(({ productId, quantity }) => ({
        product: productId,
        quantity,
      })),
      totalPrice: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      shippingAddress,
      paymentMethod: "Stripe",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        type: "order",
        userId,
        orderId: newOrder._id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
