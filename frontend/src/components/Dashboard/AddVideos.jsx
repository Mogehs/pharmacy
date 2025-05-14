import React, { useState } from "react";
import { motion } from "framer-motion";
import AddVideoOverlay from "./AddVideosOverlay";
import EditVideoOverlay from "./EditVideoOverlay";

import DeleteVideoConfirmation from "./DeleteVideoConfirmation";
import {
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} from "../features/videoApi";

const Videos = () => {
  const { data: videos = [], isLoading, isError } = useGetVideosQuery();
  const [addVideo] = useAddVideoMutation();
  const [updateVideo] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVideo = async (video) => {
    await addVideo(video);
    setIsAdding(false);
  };

  const handleEditVideo = (video) => {
    setSelectedVideo(video);
    setIsEditing(true);
  };

  const handleSaveVideo = async (updatedVideo, id) => {
    await updateVideo({ id, video: updatedVideo });
    setIsEditing(false);
  };

  const handleDeleteVideo = async (id) => {
    await deleteVideo(id);
    setIsDeleting(false);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 mt-6 max-w-[962px] overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between mb-4 items-center gap-4">
        <h3 className="text-[18px] md:text-2xl font-bold text-[#00B8A9] tracking-wide">
          🎬 Video Management
        </h3>
        <motion.button
          onClick={() => setIsAdding(true)}
          whileHover={{ scale: 1.05, backgroundColor: "#00796B" }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="px-5 py-2 text-sm font-medium rounded-full bg-[#00B8A9] text-white shadow hover:shadow-md"
        >
          ➕ Add New Video
        </motion.button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by title, ID or category..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-medium-color text-sm uppercase tracking-wide">
            <tr>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">YouTube Link</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Loading videos...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-red-400">
                  Failed to fetch videos.
                </td>
              </tr>
            ) : filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <tr
                  key={video._id}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-3 py-2">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt="Thumbnail"
                      className="w-20 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-3 py-2">{video.title}</td>
                  <td className="px-3 py-2">{video.category}</td>
                  <td className="px-3 py-2 text-blue-600 underline break-words max-w-[180px]">
                    {video.link}
                  </td>
                  <td className="flex items-center px-3 py-2 space-x-2 mt-3">
                    <button
                      onClick={() => handleEditVideo(video)}
                      className="text-sm px-4 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedVideo(video);
                        setIsDeleting(true);
                      }}
                      className="text-sm px-4 py-1 rounded-full text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No videos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <AddVideoOverlay
          onClose={() => setIsAdding(false)}
          onAdd={handleAddVideo}
        />
      )}
      {isEditing && selectedVideo && (
        <EditVideoOverlay
          video={selectedVideo}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveVideo}
        />
      )}
      {isDeleting && selectedVideo && (
        <DeleteVideoConfirmation
          video={selectedVideo}
          onClose={() => setIsDeleting(false)}
          onDelete={() => handleDeleteVideo(selectedVideo._id)}
        />
      )}
    </motion.div>
  );
};

export default Videos;
