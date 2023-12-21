import { Customer } from "@/types/Models/Customer";
import { CustomersSlicerState } from "../../types/pages/customers";
import { PayloadAction } from "@reduxjs/toolkit";

export const customersActions = {
  toggleCreateCustomerModalDisplay: (state: CustomersSlicerState) => {
    state.createCustomerModalDisplay = !state.createCustomerModalDisplay;
  },
  toggleUpdateCustomerModalDisplay: (state: CustomersSlicerState) => {
    state.updateCustomerModalDisplay = !state.updateCustomerModalDisplay;
  },
  setUpdatingCustomer: (state: CustomersSlicerState, action: PayloadAction<Customer>) => {
    state.updatingCustomer = action.payload;
  }
}
