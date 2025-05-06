import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartItem,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/clear", authMiddleware, clearCart);

export default router;
