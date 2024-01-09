import { ExpensesSlicerState } from "@/redux/types/pages/expenses"
import { Expense } from "@/types/Models/Expense";
import { PayloadAction } from "@reduxjs/toolkit";

export const expensesActions = {
  toggleCreateExpenseModal: (state: ExpensesSlicerState) => {
    state.createExpenseModalDisplay = !state.createExpenseModalDisplay;
  },
  toggleUpdateExpenseModal: (state: ExpensesSlicerState) => {
    state.updateExpenseModalDisplay = !state.updateExpenseModalDisplay;
  },
  setUpdatingExpense: (state: ExpensesSlicerState, action: PayloadAction<Expense>) => {
    state.updatingExpense = action.payload;
  }
}

