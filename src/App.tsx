import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/homepage";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";
import { ErrorBoundaryContainer } from "./components/ErrorBoundary";
import { NotFound } from "./pages/notFound";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { IOrderItem } from "./interface";

export const BasketContext = createContext<{
	basket: IOrderItem[];
	setBasket: (value: IOrderItem[]) => void;
}>({
	basket: [],
	setBasket: (value: IOrderItem[]) => {},
});

export const useBasket = () => {
	return useContext(BasketContext);
};

const queryClient = new QueryClient();

function App() {
	const [basket, setBasket] = useState<IOrderItem[]>([]);

	return (
		<BrowserRouter>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#FFAB08",
					},
				}}
			>
				<BasketContext.Provider value={{ basket, setBasket }}>
					<QueryClientProvider client={queryClient}>
						<ErrorBoundaryContainer>
							<Provider store={store}>
								<Routes>
									<Route
										path="/"
										element={<HomePage />}
									/>
									<Route
										path="/login"
										element={<LoginPage />}
									/>
									<Route
										path="/register"
										element={<RegisterPage />}
									/>
									<Route
										path="*"
										element={<NotFound />}
									/>
								</Routes>
							</Provider>
						</ErrorBoundaryContainer>
					</QueryClientProvider>
				</BasketContext.Provider>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
