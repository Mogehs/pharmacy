import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),

    getAllAppointments: builder.query({
      query: () => "/appointments",
      providesTags: ["Appointment"],
    }),

    getMyAppointments: builder.query({
      query: () => "/appointments/me",
      providesTags: ["Appointment"],
    }),

    getAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: (result, error, id) => [{ type: "Appointment", id }],
    }),

    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetMyAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useDeleteAppointmentMutation,
} = appointmentApi;
