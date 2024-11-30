import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../store/login/loginSlice";
import loginSaga from "../store/login/loginSaga";
const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: {
    login: loginSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Disable thunk, add saga middleware
});

// Run the Saga middleware
sagaMiddleware.run(loginSaga);

export default store;
