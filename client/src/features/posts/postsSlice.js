import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
} from "./postsActions";

const initialState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
  userPosts: [], // For storing posts of the logged-in user
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p._id !== action.payload.postId);
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase("GET_USER_POSTS", (state, action) => {
        state.userPosts = action.payload;
      })
      
    
  },
});

export default postsSlice.reducer;
