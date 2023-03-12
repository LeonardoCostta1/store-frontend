import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getAllPlans = createAsyncThunk("plans/getPlans", async () => {

  try {
    const response = await http.get(`/plan/`, {
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

const plansSlice = createSlice({
  name: "Allplans",
  initialState: {
    loaded: false,
    data:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getAllPlans.rejected, (state, action) => {
        state.loaded = false;
      });
  }
});
export const { removeDataPlan } = plansSlice.actions;
export default plansSlice.reducer;
