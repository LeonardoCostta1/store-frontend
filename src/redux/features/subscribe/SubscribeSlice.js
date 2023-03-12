import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getSubscribe = createAsyncThunk("subscribe/getSubscribe", async (id) => {

  try {
    const response = await http.get(`/subscribe/${id}`, {
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

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    loaded: false,
    data:null
  },
  reducers: {
    removeDataSubscribe(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribe.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getSubscribe.rejected, (state, action) => {
        state.loaded = false;
      });
  }
});
export const { removeDataSubscribe } = subscribeSlice.actions;
export default subscribeSlice.reducer;
