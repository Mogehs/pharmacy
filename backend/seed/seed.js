import mongoose from "mongoose";
import Course from "../models/Course.js"; // Adjust the path as needed
import dotenv from "dotenv";
import { pharmacyCourses } from "./phramacy.js"; // Adjust the path as needed
import Product from "../models/Product.js";
import { products } from "./products.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await Course.deleteMany();
await Course.insertMany(pharmacyCourses);

await Product.deleteMany();
await Product.insertMany(products);

console.log("Dummy pharmacy courses seeded!");
process.exit();
