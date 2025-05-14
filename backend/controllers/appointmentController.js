import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    const {
      address,
      authorizations,
      birthDate,
      date,
      email,
      guardianFirst,
      guardianLast,
      phone,
    } = req.body;

    const appointment = new Appointment({
      user: req.user._id,
      address,
      authorizations,
      birthDate,
      date,
      email,
      guardianFirst,
      guardianLast,
      phone,
    });

    const saved = await appointment.save();
    res.status(201).json({
      success: true,
      message: "Your Appointment Created Successfully",
      saved,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "user",
      "name email"
    );
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.user._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this appointment" });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this appointment" });
    }

    await appointment.remove();
    res.status(200).json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Completed", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Only 'Completed' or 'Cancelled' are allowed.",
      });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status !== "Scheduled") {
      return res.status(400).json({
        message: "Only appointments with status 'Scheduled' can be updated.",
      });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: `Appointment marked as ${status}.`,
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
