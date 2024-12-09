import { call, put, all, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  sendBlogRequest,
  sendBlogSuccess,
  sendBlogFailure,
  fetchBlogRequest,
  fetchBlogSuccess,
  fetchBlogFailure,
  deleteBlogRequest,
  deleteBlogSuccess,
  deleteBlogFailure,
  updateBlogRequest,
  updateBlogSuccess,
  updateBlogFailure,
} from "./blogSlice";

function* sendBlogSaga(action) {
  console.log("kashish dj", action.payload);

  try {
    console.log("sending api");

    const response = yield call(
      axios.post,
      "http://127.0.0.1:8000/api/create/blog",
      action.payload
    );
    yield put(sendBlogSuccess(response.data));
  } catch (error) {
    yield put(
      sendBlogFailure(error.response?.data?.Blog || "Failed to send Blog")
    );
  }
}

// Saga to handle fetching all Blogs
function* fetchBlogSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "http://127.0.0.1:8000/api/list/blog",
      action.payload
    );
    yield put(fetchBlogSuccess(response.data));
  } catch (error) {
    yield put(
      fetchBlogFailure(error.response?.data?.Blog || "Failed to fetch Blogs")
    );
  }
}

function* deleteBlogSaga(action) {
  console.log("action.payload ", action.payload);
  try {
    const response = yield call(
      axios.post,
      `http://127.0.0.1:8000/api/delete/blog/${action.payload}`
    );
    yield put(deleteBlogSuccess({ id: action.payload, ...response.data }));
  } catch (error) {
    yield put(
      deleteBlogFailure(error.response?.data?.Blog || "Failed to delete Blog")
    );
  }
}

// update
function* updateBlogSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `http://127.0.0.1:8000/api/update/blog`,
      action.payload
    );
    yield put(
      updateBlogSuccess({ FormData: action.payload, ...response.data })
    );
  } catch (error) {
    yield put(
      updateBlogFailure(error.response?.data?.Blog || "Failed to update Blog")
    );
  }
}
// Watcher Saga for the send Blog request
function* watchSendBlog() {
  yield takeEvery(sendBlogRequest.type, sendBlogSaga);
}

// Watcher Saga for the fetch Blog request
function* watchFetchBlog() {
  yield takeEvery(fetchBlogRequest.type, fetchBlogSaga);
}
function* watchDeleteBlogs() {
  yield takeEvery(deleteBlogRequest.type, deleteBlogSaga);
}

function* watchUpdateBlogs() {
  yield takeEvery(updateBlogRequest.type, updateBlogSaga);
}
export default function* blogSaga() {
  yield all([
    watchSendBlog(),
    watchFetchBlog(),
    watchDeleteBlogs(),
    watchUpdateBlogs(),
  ]);
}
