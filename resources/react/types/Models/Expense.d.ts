export interface Expense {
  id?: number,
  amount?: number,
  date?: string,
  method?: string,
  description?: string,
  receipt?: string,
  created_at?: string,
  updated_at?: string,
  created_by?: number | string
}
