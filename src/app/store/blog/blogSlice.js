import { createSlice } from "@reduxjs/toolkit";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_SUCCEEDED,
  STATUS_FAILED,
  ERROR_MESSAGE_DEFAULT,
} from "../../admin/constants/status";

// Initial state
const initialState = {
  status: STATUS_IDLE,
  message: null,
  error: null,
  data: [], // To store the list of messages
  currentPage: 1, // Start at page 1 (instead of 0)
  lastPage: 1, // Set lastPage to 1 initially
  totalCount: 0, // Initialize totalCount as 0
  perPage: 10, // Set default perPage
  next_page_url: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetState: () => initialState,
    resetState2: (state) => {
      state.status = STATUS_IDLE;
      state.error = null;
      state.message = null;
    },
    sendBlogRequest: (state) => {
      console.log("sending");
      state.status = STATUS_PENDING;
      state.message = null;
      state.error = null;
    },
    sendBlogSuccess: (state, action) => {
      state.status = STATUS_SUCCEEDED;
      state.message = action.payload.message;
      state.error = null;
    },
    sendBlogFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.message = null;
      state.error = action.payload.error || ERROR_MESSAGE_DEFAULT;
    },

    fetchBlogRequest: (state) => {
      state.status = STATUS_PENDING;
      state.error = null;
    },
    fetchBlogSuccess: (state, action) => {
      state.status = STATUS_SUCCEEDED;
      state.data = action.payload.data.blog.data;
      state.totalCount = action.payload.data.blog.total;
      state.currentPage = action.payload.data.blog.current_page;
      state.lastPage = action.payload.data.blog.last_page;
      state.perPage = action.payload.data.blog.per_page;
      state.next_page_url = action.payload.data.blog.next_page_url;
    },
    fetchBlogFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.error = action.payload || ERROR_MESSAGE_DEFAULT;
    },

    deleteBlogRequest: (state, action) => {
      console.log("deleteMessageRequest action:", action);
      state.status = STATUS_PENDING;
      state.error = null;
    },
    deleteBlogSuccess: (state, action) => {
      console.log("deleteMessageSuccess payload:", action.payload);
      state.status = STATUS_SUCCEEDED;
      state.message = action.payload.blog;
      // Remove the deleted message from the state
      const index = state.data.findIndex((msg) => msg.id === action.payload.id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },

    deleteBlogFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.error = action.payload || ERROR_MESSAGE_DEFAULT;
    },

    updateBlogRequest: (state) => {
      state.status = STATUS_PENDING;
      state.error = null;
    },

    updateBlogSuccess: (state, action) => {
      state.status = STATUS_SUCCEEDED;
      state.message = action.payload.message;
      // Find the message in the data array and update it
      const { id, name, email, message } = action.payload.FormData;
      state.data = state.data.map((msg) =>
        msg.id === id ? { ...msg, name, email, message } : msg
      );
    },

    updateBlogFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.error = action.payload || ERROR_MESSAGE_DEFAULT;
    },
  },
});

export const {
  resetState,
  resetState2,
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
} = blogSlice.actions;

export default blogSlice.reducer;
