import { Brand } from "@/types/Models/Brand"
import { Category } from "@/types/Models/Category"
import { Product } from "@/types/Models/Product"

export type ProductsSlicerState = {
  createCategoryModalDisplay: boolean,
  createBrandModalDisplay: boolean,
  createProductModalDisplay: boolean,
  updateCategoryModalDisplay: boolean,
  updateProductModalDisplay: boolean,
  updatingCategory: Category,
  updateBrandModalDisplay: boolean,
  updatingBrand: Brand,
  updatingProduct: Product
}
