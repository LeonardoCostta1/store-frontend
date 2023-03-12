import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 'pt-BR' };

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setEN(state) {
      state.value = 'en-US';
    },
    setPT(state) {
      state.value = 'pt-BR';
    }
  }
});
export const { setEN, setPT } = translateSlice.actions;
export default translateSlice.reducer;
