// controllers/applicationController.js
import Application from "../models/Application.js";

// Create a new application
export const createApplication = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { courseTitle } = req.body;
    const newApplication = new Application({ studentId, courseTitle });
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ message: "Failed to create application", error });
  }
};

// Get all applications (optionally filtered by studentId)
export const getApplications = async (req, res) => {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { studentId } : {};
    const applications = await Application.find(filter).populate("studentId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error });
  }
};

// Get a specific application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "studentId"
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch application", error });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this application" });
    }
    if (!["applied", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to update application", error });
  }
};

// Delete an application
export const deleteApplication = async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this application" });
    }
    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application", error });
  }
};
