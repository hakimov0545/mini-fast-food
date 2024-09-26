import { createApi } from "@reduxjs/toolkit/query/react";
import { IBasket, IBasketConfirm } from "@src/interface";
import { axiosBaseQuery } from "@store/axiosBaseQuery";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "http://75.101.221.235:8080/api/order",
	}),
	tagTypes: ["Orders"],
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: (id: number | string) => ({
				url: `/get/${id}`,
				method: "get",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}),
			providesTags: ["Orders"],
		}),
		createOrder: builder.mutation({
			query: (order: IBasket) => ({
				url: "/create",
				method: "post",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: order,
			}),
			invalidatesTags: ["Orders"],
		}),
		confirmOrder: builder.mutation({
			query: (data: IBasketConfirm) => ({
				url: "/confirm",
				method: "post",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data,
			}),
			invalidatesTags: ["Orders"],
		}),
	}),
});

export const {
	useGetOrdersQuery,
	useCreateOrderMutation,
	useConfirmOrderMutation,
} = ordersApi;
