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
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetState: () => initialState,
    resetState2: (state) => {
      state.status = STATUS_IDLE;
      state.error = null;
      state.message = null;
    },
    sendMessageRequest: (state) => {
      state.status = STATUS_PENDING;
      state.message = null;
      state.error = null;
    },
    sendMessageSuccess: (state, action) => {
      console.log("action.payload ", action.payload);
      state.status = STATUS_SUCCEEDED;
      state.message = action.payload.message;
      state.error = null;
      state.data = action.payload.data;
    },
    sendMessageFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.message = null;
      state.error = action.payload.error || ERROR_MESSAGE_DEFAULT;
      state.data = [];
    },

    fetchMessagesRequest: (state) => {
      state.status = STATUS_PENDING;
      state.error = null;
    },
    fetchMessagesSuccess: (state, action) => {
      state.status = STATUS_SUCCEEDED;
      state.data = action.payload.data.messages;
    },
    fetchMessagesFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.error = action.payload || ERROR_MESSAGE_DEFAULT;
    },

    deleteMessageRequest: (state, action) => {
      state.status = STATUS_PENDING;
      state.error = null;
    },
    deleteMessageSuccess: (state, action) => {
      state.status = STATUS_SUCCEEDED;
      state.message = action.payload.message;
      // Remove the deleted message from the state
      const index = state.data.findIndex((msg) => msg.id === action.payload.id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },

    deleteMessageFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.error = action.payload || ERROR_MESSAGE_DEFAULT;
    },

    updateMessageRequest: (state) => {
      state.status = STATUS_PENDING;
      state.error = null;
    },

    updateMessageSuccess: (state, action) => {
      state.status = STATUS_SUCCEEDED;
      state.message = action.payload.message;
      // Find the message in the data array and update it
      const { id, name, email, message } = action.payload.FormData;
      state.data = state.data.map((msg) =>
        msg.id === id ? { ...msg, name, email, message } : msg
      );
    },

    updateMessageFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.error = action.payload || ERROR_MESSAGE_DEFAULT;
    },
  },
});

export const {
  resetState,
  resetState2,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailure,
  fetchMessagesRequest,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFailure,
  updateMessageRequest,
  updateMessageSuccess,
  updateMessageFailure,
} = contactSlice.actions;

export default contactSlice.reducer;
