// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../../initialStates/pages/expenses";

// Actions
import { expensesActions } from "../../actions/pages/expenses";


const expensesSlicer = createSlice({
  name: "expensesPage",
  initialState,
  reducers: {
    ...expensesActions
  }
});

export default expensesSlicer.reducer;
export const { toggleCreateExpenseModal, toggleUpdateExpenseModal, setUpdatingExpense } = expensesSlicer.actions;
