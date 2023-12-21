import { LayoutSlicerState } from "../types/layout";
import { PayloadAction } from "@reduxjs/toolkit";
import { ServerLayoutsWords } from "@/types/Server";
import { LayoutSettings } from "@/types/Layout";

export const layoutActions = {
  setLayoutsWords: (state: LayoutSlicerState, action: PayloadAction<ServerLayoutsWords>) => {
    state.layoutsWords = action.payload;
  },
  setUrl: (state: LayoutSlicerState, action: PayloadAction<string>) => {
    state.url = action.payload;
  },
  setSettings: (state: LayoutSlicerState, action: PayloadAction<LayoutSettings>) => {
    state.settings = action.payload;
  }
}
