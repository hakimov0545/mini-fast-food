import axios from "axios";

export const token =
	"68bb44e45a0e6bdcc294e445e1670b25190a1df82eef3698eb7cdde47a4ec4caf6284b146424c260089e246770ae1168311a34c1226a8ba87b660fd9bcae4a25ccde139b92af13528c3c36f6caece5eefada8588aa29b658e15cc91ee7e56cf9766b5f9d0a845e3413e17c3b35663681fdec2cd40f13c3be84f1800a89981f1e";

export const api = axios.create({
	baseURL: "http://localhost:1337/api",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
