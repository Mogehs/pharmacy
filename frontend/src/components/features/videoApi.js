import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Videos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["Videos"],
    }),
    addVideo: builder.mutation({
      query: (video) => ({
        url: "/videos",
        method: "POST",
        body: video,
      }),
      invalidatesTags: ["Videos"],
    }),
    updateVideo: builder.mutation({
      query: ({ id, video }) => ({
        url: `/videos/${id}`,
        method: "PUT",
        body: video,
      }),
      invalidatesTags: ["Videos"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
