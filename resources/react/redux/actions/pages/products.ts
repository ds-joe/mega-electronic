import { Category } from "@/types/Models/Category";
import { ProductsSlicerState } from "../../types/pages/products";
import { PayloadAction } from "@reduxjs/toolkit";
import { Brand } from "@/types/Models/Brand";
import { Product } from "@/types/Models/Product";


export const productsActions = {
  toggleCreateCategoryModalDisplay: (state: ProductsSlicerState, _action: PayloadAction) => {
    state.createCategoryModalDisplay = !state.createCategoryModalDisplay;
  },
  toggleCreateBrandModalDisplay: (state: ProductsSlicerState, _action: PayloadAction) => {
    state.createBrandModalDisplay = !state.createBrandModalDisplay;
  },
  toggleCreateProductModalDisplay: (state: ProductsSlicerState, _action: PayloadAction) => {
    state.createProductModalDisplay = !state.createProductModalDisplay;
  },
  toggleUpdateCategoryModalDisplay: (state: ProductsSlicerState) => {
    state.updateCategoryModalDisplay = !state.updateCategoryModalDisplay
  },
  toggleUpdateProductModalDisplay: (state: ProductsSlicerState) => {
    state.updateProductModalDisplay = !state.updateProductModalDisplay;
  },
  setUpdatingCategory: (state: ProductsSlicerState, action: PayloadAction<Category>) => {
    state.updatingCategory = action.payload;
  },
  toggleUpdateBrandModalDisplay: (state: ProductsSlicerState) => {
    state.updateBrandModalDisplay = !state.updateBrandModalDisplay;
  },
  setUpdatingBrand: (state: ProductsSlicerState, action: PayloadAction<Brand>) => {
    state.updatingBrand = action.payload;
  },
  setUpdatingProduct: (state: ProductsSlicerState, action: PayloadAction<Product>) => {
    state.updatingProduct = action.payload;
  }
}
