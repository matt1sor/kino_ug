import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth";
import repertoireReducer from "../store/features/repertoire";
import movieReducer from "../store/features/movies";
import orderReducer from "../store/features/order";

import { logger } from "redux-logger";

export default configureStore({
  reducer: {
    auth: authReducer,
    repertoire: repertoireReducer,
    movie: movieReducer,
    order: orderReducer,
  },
  middleware: (getDefultMiddleware) => getDefultMiddleware().concat(logger),
});
