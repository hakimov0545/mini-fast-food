import axios from "axios";

export const axiosBaseQuery =
	({ baseUrl }: { baseUrl: string }) =>
	async ({ url, method, data, params }: any) => {
		try {
			const token = localStorage.getItem("token");
			const result = await axios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers: {
					Authorization: token ? `Bearer ${token}` : "",
				},
			});

			return { data: result.data };
		} catch (axiosError: any) {
			return {
				error: {
					status: axiosError.response?.status,
					data:
						axiosError.response?.data ||
						axiosError.message,
				},
			};
		}
	};
