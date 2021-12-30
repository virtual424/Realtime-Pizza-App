import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = { pending: "IDLE", error: "" };

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload.message;
    },

    showLoading(state) {
      state.pending = true;
    },

    hideLoading(state) {
      state.pending = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
