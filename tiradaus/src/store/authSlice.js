import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
    setAuth(state, action) {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    updateUserName(state, action) {
      state.data = { ...state.data, username: action.payload };
    }
  },
});

export const { logout, setAuth, updateUserName } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => !!state.auth?.data;
export const isAdmin = (state) => state.auth?.data?.roleId === 1;
export const selectAuthToken = (state) => state.auth?.data?.accessToken || null;
