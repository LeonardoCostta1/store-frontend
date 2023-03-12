import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getUser = createAsyncThunk("user/getUSer", async (email) => {

  try {
    const response = await http.get(`/user/email/${email}`, {
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    loaded: false,
    data:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loaded = false;
      });
  }
});

export default userSlice.reducer;
