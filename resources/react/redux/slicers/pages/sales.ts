// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../../initialStates/pages/sales";

// Actions
import { salesActions } from "../../actions/pages/sales";


const salesSlicer = createSlice({
  name: "salesPage",
  initialState,
  reducers: {
    ...salesActions
  }
});

export default salesSlicer.reducer;
export const { toggleCreateSaleModal } = salesSlicer.actions;
