import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct } from "@src/interface";
import {axiosBaseQuery} from "@store/axiosBaseQuery";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://172e723ede4ab95a.mokky.dev/products",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "",
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
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;
