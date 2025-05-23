import React from "react";
import { ArrowRight } from "lucide-react";
import { useGetVideosQuery } from "./features/videoApi";

const YouTubeVideos = () => {
  const { data: videoData = [] } = useGetVideosQuery();
  return (
    <div className="bg-white text-black p-6 md:p-10 space-y-10">
      {videoData.map((video, index) => (
        <div key={index} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-[#00B8A9] md:w-1/2">
              {video.category}
            </h2>
            <div className="mt-2 md:mt-0 md:w-1/2 flex items-center justify-end space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                alt="YouTube"
                className="w-8 h-10"
              />
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00B8A9] font-medium hover:underline flex items-center"
              >
                Watch on YouTube <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between">
            <div className="w-full md:w-auto">
              <iframe
                width="480"
                height="360"
                src={video.link.replace("watch?v=", "embed/")}
                title={video.title}
                className="w-full md:w-[480px] h-[360px] rounded shadow"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h3 className="mt-2 text-lg font-medium">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YouTubeVideos;
