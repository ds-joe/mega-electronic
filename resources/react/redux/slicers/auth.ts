// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../initialStates/auth";

// Actions
import { authActions } from "../actions/auth";


const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    ...authActions
  }
});

export default authSlicer.reducer;
export const { setUser } = authSlicer.actions;
