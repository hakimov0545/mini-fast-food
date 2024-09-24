import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "@store/categories";
import { productsApi } from "@store/products";
import { authApi } from "./auth";
import authReducer from "./authSlice";
import { userApi } from "./user";
import { ordersApi } from "./orders";

export const store = configureStore({
	reducer: {
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(categoriesApi.middleware)
			.concat(productsApi.middleware)
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
