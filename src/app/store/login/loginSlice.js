import { createSlice } from "@reduxjs/toolkit";

import {
  STATUS_IDLE,
  STATUS_PENDING,
  STATUS_SUCCEEDED,
  STATUS_FAILED,
  ERROR_MESSAGE_DEFAULT,
} from "../../admin/constants/status";

const initialState = {
  status: STATUS_IDLE,
  error: null,
  message: null,
  data: [],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetState: () => initialState,
    sendLoginRequest: (state) => {
      state.status = STATUS_PENDING;
      state.error = null;
      state.message = null;
    },

    sendLoginSuccess: (state, action) => {
      state.status = STATUS_SUCCEEDED;
      state.error = null;
      state.data = action.payload;
    },
    sendLoginFailure: (state, action) => {
      state.status = STATUS_FAILED;
      state.error = action.payload.error || ERROR_MESSAGE_DEFAULT;
      state.message = null;
    },
  },
});

export const {
  resetState,
  sendLoginRequest,
  sendLoginSuccess,
  sendLoginFailure,
} = loginSlice.actions;
export default loginSlice.reducer;
