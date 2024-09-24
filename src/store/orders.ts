import { createApi } from "@reduxjs/toolkit/query/react";
import { IBasket } from "@src/interface";
import { axiosBaseQuery } from "@store/axiosBaseQuery";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "http://75.101.221.235:8080/api/product",
	}),
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: (id: number | string) => ({
				url: `/get/${id}`,
				method: "post",
			}),
		}),
		createOrder: builder.mutation({
			query: (order: IBasket) => ({
				url: "/create",
				method: "post",
				data: order,
			}),
		}),
	}),
});

export const { useGetOrdersQuery, useCreateOrderMutation } =
	ordersApi;
