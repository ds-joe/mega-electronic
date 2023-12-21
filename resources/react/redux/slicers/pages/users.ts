// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../../initialStates/pages/users";

// Actions
import { usersActions } from "../../actions/pages/users";

const usersSlicer = createSlice({
  name: "usersPage",
  initialState,
  reducers: {
    ...usersActions
  }
});

export default usersSlicer.reducer;
export const { toggleCreateUserModalDisplay, toggleUpdateUserModalDisplay, setUpdatingUser } = usersSlicer.actions;
