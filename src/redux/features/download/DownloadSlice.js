import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getDownload = createAsyncThunk("track/getOnlyTracks", async (trackId) => {
  try {
    const response = await http.get(`/track/${trackId}/download`, {
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

const downloadSlice = createSlice({
  name: "download",
  initialState: {
    loaded: false,
    data: localStorage.getItem("token")
  },
  reducers: {
    setOnlyTrack: (state, action) => {
      state.data = action.payload;
      state.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDownload.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loaded = true;
      })
      .addCase(getDownload.rejected, (state, action) => {
        state.loaded = false;
        state.data = null;
      });
  }
});

export const { setOnlyTrack, logout } = downloadSlice.actions;

export default downloadSlice.reducer;