import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: JSON.parse(localStorage.getItem("auth")) || false,
  session: JSON.parse(localStorage.getItem("session")) || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = !state.auth;
      localStorage.setItem("auth", JSON.stringify(action.auth));
      localStorage.setItem("session", JSON.stringify(action.session));
    },
    logout: (state) => {
      state.auth = !state.auth;
      localStorage.removeItem("auth");
      localStorage.removeItem("session");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
