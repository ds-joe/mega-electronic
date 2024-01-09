import { Expense } from "@/types/Models/Expense";

export type ExpensesSlicerState = {
  createExpenseModalDisplay: boolean,
  updateExpenseModalDisplay: boolean,
  updatingExpense: Expense | null
}
