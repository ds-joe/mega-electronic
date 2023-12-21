import { Brand } from "@/types/Models/Brand"
import { Category } from "@/types/Models/Category"

export type ProductsSlicerState = {
  createCategoryModalDisplay: boolean,
  createBrandModalDisplay: boolean,
  createProductModalDisplay: boolean,
  updateCategoryModalDisplay: boolean,
  updatingCategory: Category,
  updateBrandModalDisplay: boolean,
  updatingBrand: Brand
}
