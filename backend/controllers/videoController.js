import Video from "../models/Video.js";

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { title, link, description, category } = req.body;
    if (!title || !link || !category) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newVideo = await Video.create({ title, link, description, category });
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create video" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Video.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update video" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Video.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Video not found" });
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete video" });
  }
};
