import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/homepage";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { createContext, useEffect, useState } from "react";
import { IBasket } from "@src/interface";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";

export const BasketContext = createContext<{
	basket: IBasket[];
	setBasket: (value: IBasket[]) => void;
	sum: number;
	setSum: (value: number) => void;
}>({
	basket: [],
	setBasket: (value: IBasket[]) => {
		console.log(value);
	},
	sum: 0,
	setSum: (value: number) => {
		console.log(value);
	},
});

function App() {
	const [basket, setBasket] = useState<IBasket[]>([]);
	const [sum, setSum] = useState<number>(0);

	useEffect(() => {
		const totalSum = basket.reduce((acc, item) => {
			return acc + item.price * item.count;
		}, 0);
		setSum(totalSum);
	}, [basket]);

	return (
		<BrowserRouter>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#FFAB08",
					},
				}}
			>
				<Provider store={store}>
					<BasketContext.Provider
						value={{ basket, setBasket, sum, setSum }}
					>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route
								path="/login"
								element={<LoginPage />}
							/>
							<Route
								path="/register"
								element={<RegisterPage />}
							/>
						</Routes>
					</BasketContext.Provider>
				</Provider>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
