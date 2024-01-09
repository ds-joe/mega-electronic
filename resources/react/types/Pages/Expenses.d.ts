import { UseTableResponseData } from "../Hooks/useTable"
import { Expense } from "../Models/Expense"
import { User } from "../Models/User"


type ExpensesTable = UseTableResponseData<Expense & {
  owner: User
}>
export type ExpensesProps = {
  expenses_table: ExpensesTable;
}
