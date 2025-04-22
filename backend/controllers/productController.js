import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, prescriptionRequired } =
      req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const images = [];

    for (const file of req.files) {
      const dataUri = getDataUri(file);
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "pharmacy/products",
      });
      images.push(result.secure_url);
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      prescriptionRequired,
      image: images[0],
      images,
    });

    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, prescriptionRequired } =
      req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files && req.files.length > 0) {
      const images = [];

      for (const file of req.files) {
        const dataUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "products",
        });
        images.push(result.secure_url);
      }

      product.image = images[0]; // Primary image
      product.images = images;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.prescriptionRequired =
      prescriptionRequired ?? product.prescriptionRequired;

    await product.save();

    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
