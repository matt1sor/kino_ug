import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
