import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@store/axiosBaseQuery";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "http://75.101.221.235:8080/api/product",
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: "/get",
				method: "get",
			}),
		}),
		getProductsByCategory: builder.query({
			query: (category: string) => ({
				url: `/get/by-category/${category}`,
				method: "get",
			}),
		}),
	}),
});

export const { useGetProductsQuery, useGetProductsByCategoryQuery } =
	productsApi;
