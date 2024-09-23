import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "@store/categories";
import { productsApi } from "@store/products";
import { authApi } from "./auth";

export const store = configureStore({
	reducer: {
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(categoriesApi.middleware)
			.concat(productsApi.middleware)
			.concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
