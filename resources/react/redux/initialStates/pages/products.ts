// Types
import { ProductsSlicerState } from "../../types/pages/products";

export const initialState: ProductsSlicerState = {
  createCategoryModalDisplay: false,
  createBrandModalDisplay: false,
  createProductModalDisplay: false,
  updateCategoryModalDisplay: false,
  updateProductModalDisplay: false,
  updatingCategory: {},
  updateBrandModalDisplay: false,
  updatingBrand: {},
  updatingProduct: {}
}
