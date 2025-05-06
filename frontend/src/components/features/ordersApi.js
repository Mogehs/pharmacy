import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  tagTypes: ["Orders", "MyOrders", "Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders", "MyOrders"],
    }),

    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    getMyOrders: builder.query({
      query: () => "/orders/my-orders",
      providesTags: ["MyOrders"],
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        "Orders",
        { type: "Order", id },
      ],
    }),

    markOrderAsPaid: builder.mutation({
      query: (paymentData) => ({
        url: "/orders/mark-paid",
        method: "PUT",
        body: paymentData,
      }),
      invalidatesTags: ["Orders", "MyOrders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders", "MyOrders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useMarkOrderAsPaidMutation,
  useDeleteOrderMutation,
} = orderApi;
