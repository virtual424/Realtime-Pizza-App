import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { cart: [], totalAmount: 0, totalItems: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload.cart;
      state.totalAmount = action.payload.totalAmount;
      state.totalItems = action.payload.totalItems;
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
