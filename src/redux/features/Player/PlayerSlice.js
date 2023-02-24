import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

const isPlayingSlice = createSlice({
  name: "isPlaying",
  initialState,
  reducers: {
    setIsPlaying(state,action) {
      state.value = action.payload;
    },
    setTrackToPrincipalPlayer(state,action) {
      state.value = action.payload;
    },
  }
});
export const { setIsPlaying,setTrackToPrincipalPlayer} = isPlayingSlice.actions;
export default isPlayingSlice.reducer;
