import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth";
import repertoireReducer from "../store/features/repertoire";

export default configureStore({
  reducer: {
    auth: authReducer,
    repertoire: repertoireReducer,
  },
});
