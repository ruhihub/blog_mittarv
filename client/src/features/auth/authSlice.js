// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateProfile } from "./authActions";

// Login
// const API_URL = 'http://localhost:8000/api/auth';
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL + '/api/auth';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            // Make the POST request to your login endpoint
            // The URL here is crucial: It must be API_URL + /login
            const response = await axios.post(API_URL + '/login', userData);

            // If login is successful, you might want to store the token in local storage
            // or handle it as needed in your application state.
            if (response.data.token) {
                // localStorage.setItem('user', JSON.stringify(response.data));
                // localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('token', JSON.stringify(response.data.token));
localStorage.setItem('user', JSON.stringify(response.data.user)); // ADD THIS

                
                return response.data; // Return the user data and token from the response
            } else {
                return thunkAPI.rejectWithValue('Login failed: No token received.');
            }

        } catch (error) {
            // Handle different types of errors from the server
            const message =
                (error.response &&
                 error.response.data &&
                 error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      // localStorage.setItem("token", res.data.token);
      localStorage.setItem("token", JSON.stringify(res.data.token));
localStorage.setItem("user", JSON.stringify(res.data.user)); // ADD THIS

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // token: localStorage.getItem("token") || null,
    token: JSON.parse(localStorage.getItem("token")) || null,
    user: JSON.parse(localStorage.getItem("user")) || null,

    // user: null,
    loading: false,
    error: null,
    getUser:false
  },
  reducers: {
    logout: (state) => {
      // localStorage.removeItem("token");
      localStorage.removeItem("token");
localStorage.removeItem("user");

      delete axios.defaults.headers.common["Authorization"];
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.getUser = true;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

