import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@store/axiosBaseQuery";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "http://75.101.221.235:8080/api/user",
	}),
	endpoints: (builder) => ({
		getUserById: builder.query({
			query: (id: number | string) => ({
				url: `/get/${id}`,
				method: "get",
			}),
		}),
		getUserByUsername: builder.query({
			query: (username: string) => ({
				url: `/get/by-username/${username}`,
				method: "get",
			}),
		}),
		getUsernameExist: builder.query({
			query: (username: string) => ({
				url: `/exist/${username}`,
				method: "get",
			}),
		}),
	}),
});

export const {
	useGetUserByIdQuery,
	useGetUserByUsernameQuery,
	useGetUsernameExistQuery,
} = userApi;
