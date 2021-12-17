import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = { error: "" };

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload.errorMessage;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
