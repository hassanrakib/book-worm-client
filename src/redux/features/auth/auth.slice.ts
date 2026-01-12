import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  token: string | undefined;
}

const initialState: IAuthState = {
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = undefined;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
