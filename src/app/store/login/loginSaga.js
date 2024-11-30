import { call, put, all, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  sendLoginRequest,
  sendLoginSuccess,
  sendLoginFailure,
} from "./loginSlice";

function* sendLoginSaga(action) {
  try {
    console.log("Login Data:", action.payload);
    const response = yield call(
      axios.post,
      `http://127.0.0.1:8000/api/login`,
      action.payload
    );

    // Save the response (like token or user data) to localStorage
    if (response.data && response.data.token) {
      localStorage.setItem("user_token", response.data.token);
      localStorage.setItem("user_data", JSON.stringify(response.data.user));
    }

    yield put(sendLoginSuccess(response.data));
  } catch (error) {
    yield put(sendLoginFailure(error));
  }
}

function* watchLoginSaga() {
  yield takeEvery(sendLoginRequest.type, sendLoginSaga);
}
export default function* loginSaga() {
  yield all([watchLoginSaga()]);
}
