// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../../initialStates/pages/customers";

// Actions
import { customersActions } from "../../actions/pages/customers";


const customersSlicer = createSlice({
  name: "customersPage",
  initialState,
  reducers: {
    ...customersActions
  }
});

export default customersSlicer.reducer;
export const { toggleCreateCustomerModalDisplay, toggleUpdateCustomerModalDisplay, setUpdatingCustomer } = customersSlicer.actions;
