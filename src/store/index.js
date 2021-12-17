import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice.js";
import authSlice from "./authSlice.js";
import uiSlice from "./uiSlice.js";

const store = configureStore({
  reducer: {
    uiReducer: uiSlice.reducer,
    // userReducer: userSlice.reducer,
    authReducer: authSlice.reducer,
  },
});

export default store;
