import Cart from "../models/Cart.js";

// Add or Update Cart
export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update cart", details: error.message });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", products: [] });
    }

    if (cart.products.length === 0) {
      return res.status(200).json({ ...cart.toObject(), products: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get cart",
      details: error.message,
    });
  }
};

// Remove Product
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.products = cart.products.filter((p) => p._id.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to remove product", details: error.message });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  let userId = req.user._id.toString();
  try {
    await Cart.findOneAndDelete(userId);
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to clear cart", details: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const userId = req.user._id;
  const { id, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.products.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products[itemIndex].quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated successfully", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
