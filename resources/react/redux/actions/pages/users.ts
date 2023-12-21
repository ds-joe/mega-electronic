// Types
import { PayloadAction } from "@reduxjs/toolkit";
import { UsersSlicerState } from "@/redux/types/pages/users";
import { User } from "@/types/Models/User";

export const usersActions = {
  toggleCreateUserModalDisplay: (state: UsersSlicerState) => {
    state.createUserModalDisplay = !state.createUserModalDisplay;
  },
  toggleUpdateUserModalDisplay: (state: UsersSlicerState) => {
    state.updateUserModalDisplay = !state.updateUserModalDisplay;
  },
  setUpdatingUser: (state: UsersSlicerState, action: PayloadAction<User>) => {
    state.updatingUser = action.payload;
  }
};
