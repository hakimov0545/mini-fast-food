import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@src/interface";
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
		createProduct: builder.mutation({
			query: (newProduct: IProduct) => ({
				url: "",
				method: "post",
				data: newProduct,
			}),
		}),
		editProduct: builder.mutation({
			query: ({
				id,
				newProduct,
			}: {
				id: string | number;
				newProduct: IProduct;
			}) => ({
				url: `/${id}`,
				method: "patch",
				data: newProduct,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (id: string | number) => ({
				url: `/${id}`,
				method: "delete",
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductsByCategoryQuery,
	useCreateProductMutation,
	useEditProductMutation,
	useDeleteProductMutation,
} = productsApi;
