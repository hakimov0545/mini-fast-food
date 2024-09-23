import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser } from "@src/interface";
import { axiosBaseQuery } from "@store/axiosBaseQuery";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "http://75.101.221.235:8080/api/auth",
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data: {
				username: string;
				password: string;
			}) => ({
				url: "/token",
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				data,
			}),
		}),
		register: builder.mutation({
			query: (data: IUser) => ({
				url: `/register`,
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				data,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
