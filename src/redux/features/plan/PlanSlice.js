import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getPlan = createAsyncThunk("plan/getPlan", async (id) => {

  try {
    const response = await http.get(`/plan/${id}`, {
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

const planSlice = createSlice({
  name: "plan",
  initialState: {
    loaded: false,
    data:null
  },
  reducers: {
    removeDataPlan(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlan.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getPlan.rejected, (state, action) => {
        state.loaded = false;
      });
  }
});
export const { removeDataPlan } = planSlice.actions;
export default planSlice.reducer;
