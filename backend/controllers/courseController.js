import Course from "../models/Course.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      courseOverview,
      courseOutline,
      customerReviews,
      courseLevel,
      courseDuration,
      lessons,
      quizes,
      language,
      courseLink,
      isFree,
      price,
      instructor,
    } = req.body;

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
      coverImage: uploadedImage.secure_url,
      coverImagePublicId: uploadedImage.public_id,
      courseOverview,
      courseOutline,
      customerReviews: customerReviews || [],
      courseLevel,
      courseDuration,
      lessons,
      quizes,
      language,
      courseLink,
      isFree,
      price: isFree ? 0 : price,
      instructor,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to create course",
      details: error.message,
    });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch courses",
      details: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get course",
      details: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const {
      title,
      description,
      courseOverview,
      courseOutline,
      customerReviews,
      courseLevel,
      courseDuration,
      lessons,
      quizes,
      language,
      courseLink,
      isFree,
      price,
      instructor,
    } = req.body;

    if (req.file) {
      await cloudinary.uploader.destroy(course.coverImagePublicId);

      const fileUri = getDataUri(req.file);
      const uploadedImage = await cloudinary.uploader.upload(fileUri, {
        folder: "pharmacy/courses",
      });

      course.coverImage = uploadedImage.secure_url;
      course.coverImagePublicId = uploadedImage.public_id; // Update public_id
    }

    // Update other fields
    course.title = title || course.title;
    course.description = description || course.description;
    course.courseOverview = courseOverview || course.courseOverview;
    course.courseOutline = courseOutline || course.courseOutline;
    course.customerReviews = customerReviews || course.customerReviews;
    course.courseLevel = courseLevel || course.courseLevel;
    course.courseDuration = courseDuration || course.courseDuration;
    course.lessons = lessons !== undefined ? lessons : course.lessons;
    course.quizes = quizes !== undefined ? quizes : course.quizes;
    course.language = language || course.language;
    course.courseLink = courseLink || course.courseLink;
    course.instructor = instructor || course.instructor;
    course.isFree = isFree !== undefined ? isFree : course.isFree;
    course.price = isFree ? 0 : price !== undefined ? price : course.price;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.log(error);
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }

    await cloudinary.uploader.destroy(deleted.coverImagePublicId);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete course",
      details: error.message,
    });
  }
};
