import { LayoutSlicerState } from "../types/layout";
import { PayloadAction } from "@reduxjs/toolkit";
import { ServerLayoutsWords } from "@/types/Server";

export const layoutActions = {
  setLayoutsWords: (state: LayoutSlicerState, action: PayloadAction<ServerLayoutsWords>) => {
    state.layoutsWords = action.payload;
  }
}
