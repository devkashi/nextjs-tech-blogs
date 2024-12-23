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
  fetchSingleBlogRequest,
  fetchSingleBlogSuccess,
  fetchSingleBlogFailure,
} from "./blogSlice";

function* sendBlogSaga(action) {
  // console.log("kashish dj", action.payload);

  try {
    // Create a FormData object for image and text fields
    const formData = new FormData();
    formData.append("title", action.payload.title); // Replace 'title' with your text field key
    formData.append("content", action.payload.content); // Replace 'content' with your text field key
    formData.append("image", action.payload.image); // Replace 'image' with your file key
    // console.log("formdata ", formData);
    const response = yield call(
      axios.post,
      "http://127.0.0.1:8000/api/create/blog",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      }
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
  // console.log("action.payload ", action.payload);
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
  console.log("action.payload ", action.payload);
  try {
    // Create FormData object
    const formData = new FormData();
    formData.append("id", action.payload.id);
    formData.append("title", action.payload.title); // Append text fields// Append text fields
    formData.append("content", action.payload.content);
    if (action.payload.image) {
      formData.append("image", action.payload.image); // Append file if available
    }

    // API call with headers for multipart data
    const response = yield call(
      axios.post,
      `http://127.0.0.1:8000/api/update/blog`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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

function* fetchSingleBlogSaga(action) {
  console.log("action.payload ", action.payload);
  try {
    // Create FormData object
    const formData = new FormData();
    formData.append("id", action.payload);

    // API call with headers for multipart data
    const response = yield call(
      axios.post,
      `http://127.0.0.1:8000/api/fetch/single-blog`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    yield put(fetchSingleBlogSuccess(response.data));
  } catch (error) {
    yield put(
      fetchSingleBlogFailure(
        error.response?.data?.Blog || "Failed to fetch Blog"
      )
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
function* watchFetchSingleBlogs() {
  yield takeEvery(fetchSingleBlogRequest.type, fetchSingleBlogSaga);
}
export default function* blogSaga() {
  yield all([
    watchSendBlog(),
    watchFetchBlog(),
    watchDeleteBlogs(),
    watchUpdateBlogs(),
    watchFetchSingleBlogs(),
  ]);
}
