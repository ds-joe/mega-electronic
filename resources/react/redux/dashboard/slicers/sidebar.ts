// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../initialStates/sidebar";

// Actions
import { sidebarActions } from "../actions/sidebar";


const sidebarSlicer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    ...sidebarActions
  }
});

export default sidebarSlicer.reducer;
export const { toggleOpen } = sidebarSlicer.actions;
