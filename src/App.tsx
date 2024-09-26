import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/homepage";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";
import { ErrorBoundaryContainer } from "./components/ErrorBoundary";
import { NotFound } from "./pages/notFound";

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
				<ErrorBoundaryContainer>
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
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Provider>
				</ErrorBoundaryContainer>
			</ConfigProvider>
		</BrowserRouter>
	);
}

export default App;
