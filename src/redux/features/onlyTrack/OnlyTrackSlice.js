import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getOnlyTracks = createAsyncThunk("track/getOnlyTracks", async (trackId) => {
  try {
    const response = await http.get(`/track/${trackId || '63f75110c6996acd0385c36a'}`, {
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

const onlyTrackSlice = createSlice({
  name: "auth",
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
      .addCase(getOnlyTracks.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loaded = true;
      })
      .addCase(getOnlyTracks.rejected, (state, action) => {
        state.loaded = false;
        state.data = null;
      });
  }
});

export const { setOnlyTrack, logout } = onlyTrackSlice.actions;

export default onlyTrackSlice.reducer;