import { User } from "@/types/Models/User";
import { AuthSlicerState } from "../types/auth";
import { PayloadAction } from "@reduxjs/toolkit";

export const authActions = {
  setUser: (state: AuthSlicerState, action: PayloadAction<User | null>) => {
    state.user = action.payload;
  }
}
