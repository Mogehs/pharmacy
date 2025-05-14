import express from "express";
import {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";

const router = express.Router();

router.route("/").get(getAllVideos).post(createVideo);
router.route("/:id").put(updateVideo).delete(deleteVideo);

export default router;
