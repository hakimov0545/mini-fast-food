import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	userId: string | number | null;
	token: string | null;
}

const initialState: AuthState = {
	userId: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{
				userId: string | number;
				token: string;
			}>
		) => {
			state.userId = action.payload.userId;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.userId = null;
			state.token = null;
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
