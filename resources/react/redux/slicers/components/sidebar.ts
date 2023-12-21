// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../../initialStates/components/sidebar";

// Actions
import { sidebarActions } from "../../actions/components/sidebar";


const sidebarSlicer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    ...sidebarActions
  }
});

export default sidebarSlicer.reducer;
export const { toggleOpen, toggleFold } = sidebarSlicer.actions;
