// Types
import { PayloadAction } from "@reduxjs/toolkit";
import { PathsSlicerState } from "../types/paths";
import { ServerImagesPaths } from "@/types/Paths";

export const pathsActions = {
  setImagesPaths: (state: PathsSlicerState, action: PayloadAction<ServerImagesPaths>) => {
    state.images_paths = action.payload;
  }
};
