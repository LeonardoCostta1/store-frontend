import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../../services/axios";

export const getCheckout = createAsyncThunk("track/getCheckout",async (checkoutData) => {
    try {
      const response = await http.put(`/checkout/${checkoutData.userId}`,
        {
          transaction_amount: checkoutData.transaction_amount,
          description: checkoutData.description,
          email: checkoutData.email,
          first_name: checkoutData.first_name,
          last_name: checkoutData.last_name
        },
        {
          headers: {
            Authorization: process.env.REACT_APP_TOKEN_DEFAULT
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    loaded: false,
    data: localStorage.getItem("token"),
    track: null
  },
  reducers: {
    setTrackToCheckout: (state, action) => {
      state.track = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckout.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loaded = true;
      })
      .addCase(getCheckout.rejected, (state, action) => {
        state.loaded = false;
        state.data = null;
      });
  }
});

export const { setTrackToCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
