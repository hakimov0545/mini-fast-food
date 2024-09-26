import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@store/axiosBaseQuery";

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "http://75.101.221.235:8080/api/product",
	}),
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: "/get",
				method: "get",
			}),
			providesTags: ["Products"],
		}),
		getProductsByCategory: builder.query({
			query: (category: string) => ({
				url: `/get/by-category/${category}`,
				method: "get",
			}),
			providesTags: ["Products"],
		}),
	}),
});

export const { useGetProductsQuery, useGetProductsByCategoryQuery } =
	productsApi;
