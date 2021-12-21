import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";
import uiReducer from "./reducers/uiSlice.js";
import { asyncMdl } from "./middleware/async";
import { authMdl } from "./middleware/auth";
import { normalizeMdl } from "./middleware/normalize";

const store = configureStore({
  reducer: {
    uiReducer: uiReducer,
    userReducer: userReducer,
  },
  middleware: [...authMdl, ...asyncMdl, ...normalizeMdl],
});

export default store;
