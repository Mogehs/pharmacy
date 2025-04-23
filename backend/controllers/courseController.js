import Course from "../models/Course.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, courseLink, isFree, price, instructor } =
      req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const fileUri = getDataUri(req.file);
    const uploadedImage = await cloudinary.uploader.upload(fileUri, {
      folder: "pharmacy/courses",
    });

    const newCourse = new Course({
      title,
      description,
      courseLink,
      isFree,
      price: isFree ? 0 : price,
      instructor,
      coverImage: uploadedImage.secure_url,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create course", details: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch courses", details: error.message });
  }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get course", details: error.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const { title, description, courseLink, isFree, price, instructor } =
      req.body;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const uploadedImage = await cloudinary.uploader.upload(fileUri, {
        folder: "pharmacy/courses",
      });
      course.coverImage = uploadedImage.secure_url;
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.courseLink = courseLink || course.courseLink;
    course.instructor = instructor || course.instructor;
    course.isFree = isFree !== undefined ? isFree : course.isFree;
    course.price = isFree ? 0 : price !== undefined ? price : course.price;

    const updated = await course.save();
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update course", details: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete course", details: error.message });
  }
};
