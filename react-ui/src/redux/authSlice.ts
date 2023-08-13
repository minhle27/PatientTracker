import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor, Patient } from "../types";

// Define a type for the slice state
interface authState {
  user: Doctor | Patient | null,
  token: string | null
}

const initialState: authState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<authState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;