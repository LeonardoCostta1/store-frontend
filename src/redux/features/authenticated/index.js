import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

const AuthenticatedSlice = createSlice({
  name: "authenticated",
  initialState,
  user: null,
  reducers: {
    setauthenticatedTrue(state, action) {
      state.value = true;
      state.user = action.payload;
    },
    setauthenticatedFalse(state) {
      state.value = false;
      state.user = null;
    }
  }
});
export const { setauthenticatedTrue, setauthenticatedFalse } = AuthenticatedSlice.actions;
export default AuthenticatedSlice.reducer;
