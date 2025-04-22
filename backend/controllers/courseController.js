import Course from "../models/Course.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, price, videoURL, isFree } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const newCourse = new Course({
      title,
      description,
      price,
      videoURL,
      isFree,
      instructor: req.user._id,
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
    const courses = await Course.find().populate("instructor", "name email");
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
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
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
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.status(200).json(updatedCourse);
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
