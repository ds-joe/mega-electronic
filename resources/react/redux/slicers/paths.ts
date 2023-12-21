// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../initialStates/paths";

// Actions
import { pathsActions } from "../actions/paths";

const pathsSlicer = createSlice({
  name: "paths",
  initialState,
  reducers: {
    ...pathsActions
  }
});

export default pathsSlicer.reducer;
export const { setImagesPaths } = pathsSlicer.actions;
