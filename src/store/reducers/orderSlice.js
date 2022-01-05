import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = { order: [] };

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const orderAction = orderSlice.actions;
