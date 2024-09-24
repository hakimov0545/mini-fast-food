import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/homepage";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";

function App() {
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
				</Provider>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
