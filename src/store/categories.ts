import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategory } from "@src/interface";
import { axiosBaseQuery } from "@store/axiosBaseQuery";

export const categoriesApi = createApi({
	reducerPath: "categoriesApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "http://75.101.221.235:8080/api/category",
	}),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => ({
				url: "/get",
				method: "get",
			}),
		}),
		createCategory: builder.mutation({
			query: (newCategory: ICategory) => ({
				url: "",
				method: "post",
				data: newCategory,
			}),
		}),
		editCategory: builder.mutation({
			query: ({
				id,
				newCategory,
			}: {
				id: string | number;
				newCategory: ICategory;
			}) => ({
				url: `/${id}`,
				method: "patch",
				data: newCategory,
			}),
		}),
		deleteCategory: builder.mutation({
			query: (id: string | number) => ({
				url: `/${id}`,
				method: "delete",
			}),
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useCreateCategoryMutation,
	useEditCategoryMutation,
	useDeleteCategoryMutation,
} = categoriesApi;
