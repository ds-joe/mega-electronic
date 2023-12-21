export interface Sale {
  id?: number,
  method?: 'payment' | 'cash',
  amount?: number,
  discount?: number,
  created_at?: string,
  updated_at?: string,
  created_by?: string | number,
  customer_id?: number | string
}
