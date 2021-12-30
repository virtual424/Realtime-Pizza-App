import { createSlice } from "@reduxjs/toolkit";

const menuInitialState = { menu: [] };

const menuSlice = createSlice({
  name: "menu",
  initialState: menuInitialState,
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
  },
});

export const menuActions = menuSlice.actions;
export default menuSlice.reducer;
