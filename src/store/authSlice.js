import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
});

export default authSlice;
export const authActions = authSlice.actions;
