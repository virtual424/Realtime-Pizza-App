import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
