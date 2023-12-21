export interface Product {
  id?: number,
  sku?: string,
  name?: string,
  price?: number,
  rate?: number,
  image?: string,
  description?: string,
  created_at?: string,
  updated_at?: string,
  brand_id?: string | number,
  category_id?: string | number,
  created_by?: string | number
}
