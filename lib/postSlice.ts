'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

interface Post {
  _id: string;
  title: string;
  brief: string;
  content: string;
  image: string;
  type: string;
  createdAt: string;
  user: {
    login_name: string;
    avatar?: string;
  };
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string;
}

export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts");
      return response.data; 
    } catch (err: unknown) {
      if (err instanceof Error && err.message) {
        return rejectWithValue(err.message || "Алдаа гарлаа");
      }
      return rejectWithValue("Алдаа гарлаа");
    }
  }
);

const initialState: PostState = {
  posts: [],
  loading: false,
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { deletePost } = postsSlice.actions;
export default postsSlice.reducer;
