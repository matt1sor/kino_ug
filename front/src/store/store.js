import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth";
import repertoireReducer from "../store/features/repertoire";
import movieReducer from "../store/features/movies";
import logger from "redux-logger";
import { applyMiddleware } from "redux";

export default configureStore({
  reducer: {
    auth: authReducer,
    repertoire: repertoireReducer,
    movie: movieReducer,
    middleware: applyMiddleware(logger),
  },
});
