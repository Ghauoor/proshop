import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants";

export const ordersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDERS_URL,
      providesTags: ["Orders"],
    }),
  }),
});
