import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      console.log(res.data, "login response data");
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        console.log(userData, "userData in registerUser action");
      try {
        const res = await axios.post(
          // "http://localhost:8000/api/auth/register",
          `${API_URL}/api/auth/register`,
          userData,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }
  );
  
  export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async ({ bio, username }, { rejectWithValue, getState }) => {
      try {
        const token = getState().auth.token;
  
        const response = await axios.put(
          // "http://localhost:8000/api/auth/profile",
          `${API_URL}/api/auth/profile`,
          { bio, username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        return response.data.user; // assuming your backend returns { user: {...} }
      } catch (err) {
        console.error("Profile update failed:", err);
        return rejectWithValue(
          err.response?.data?.message || err.message || "Update failed"
        );
      }
    }
  );