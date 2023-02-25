// playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  playing: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: state => {
      state.playing = true;
    },
    pause: state => {
      state.playing = false;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { play, pause, setUrl } = playerSlice.actions;

export default playerSlice.reducer;