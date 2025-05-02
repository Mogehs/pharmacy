import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { uploadMultiple } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", uploadMultiple.array("productImages", 5), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", uploadMultiple.array("productImages", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
