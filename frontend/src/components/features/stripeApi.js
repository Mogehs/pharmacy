import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({ userId, items, shippingAddress }) => ({
        url: `/stripe/create-checkout-session/${userId}`,
        method: "POST",
        body: {
          items,
          shippingAddress,
        },
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = stripeApi;
