'use client';

import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  loading: boolean;
  error: string;
  success: string;
}

const initialState: UIState = {
  loading: false,
  error: "",
  success: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    clearMessages(state) {
      state.error = "";
      state.success = "";
    },
  },
});

export const { setLoading, setError, setSuccess, clearMessages } = uiSlice.actions;
export default uiSlice.reducer;
