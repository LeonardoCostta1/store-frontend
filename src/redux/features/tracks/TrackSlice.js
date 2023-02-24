import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getTracks = createAsyncThunk("track/getTracks", async () => {
  try {
    const response = await http.get("/track", {
      headers: {
        Authorization: process.env.REACT_APP_TOKEN_DEFAULT,
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
});

const trackSlice = createSlice({
  name: "tracks",
  initialState: {
    loaded: false,
    data: localStorage.getItem("token")
  },
  reducers: {
    setTrack: (state, action) => {
      state.data = action.payload;
      state.loaded = true;
    },
    logout: (state, action) => {
      state.loaded = false;
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTracks.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loaded = true;
      })
      .addCase(getTracks.rejected, (state, action) => {
        state.loaded = false;
        state.data = null;
      });
  }
});

export const { setTrack, logout } = trackSlice.actions;

export default trackSlice.reducer;
