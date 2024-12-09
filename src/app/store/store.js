import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../store/login/loginSlice";
import loginSaga from "../store/login/loginSaga";

import ContactSlice from "../store/contact/contactSlice";
import contactSaga from "../store/contact/contactSaga";
import blogSaga from "../store/blog/blogSaga";
import blogtSlice from "../store/blog/blogSlice";

const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: {
    login: loginSlice,
    contact: ContactSlice,
    blog: blogtSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Disable thunk, add saga middleware
});

// Run the Saga middleware
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(contactSaga);
sagaMiddleware.run(blogSaga);

export default store;
