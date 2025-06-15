import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = 'http://localhost:8000';
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;



export const fetchPosts = createAsyncThunk(
  "posts/",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/posts`);
      console.log( res.data, "fetched posts");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/posts/${id}`);
      console.log(`first post by id`, res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      const res = await axios.post(`${API_URL}/api/posts/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
      const res = await axios.put(`${API_URL}/api/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// features/posts/postsActions.js
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token").replace(/^"|"$/g, "");;
      const res = await axios.delete(`${API_URL}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { postId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);





export const fetchMyPosts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    const res = await axios.get(`${API_URL}/api/posts/my-posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET_USER_POSTS", payload: res.data });
  } catch (err) {
    console.error("Failed to fetch user posts:", err);
    // dispatch({ type: "GET_USER_POSTS_ERROR", payload: err.message });
  }
};