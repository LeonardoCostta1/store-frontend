import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../services/axios";

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token) => {
    try {
      const response = await http.get("/profile", {
        headers: {
          Authorization: token
        }
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    token: localStorage.getItem("token")
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state, action) => {
      state.loggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loggedIn = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loggedIn = false;
        state.token = null;
        localStorage.removeItem("token");
      });
  }
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
