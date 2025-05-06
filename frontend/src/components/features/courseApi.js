import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const courseApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Courses"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),
    addCourse: builder.mutation({
      query: (course) => ({
        url: "/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Courses"],
    }),
    updateCourse: builder.mutation({
      query: (course) => ({
        url: `/courses/${course.id}`,
        method: "PUT",
        body: course,
      }),
      invalidatesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
