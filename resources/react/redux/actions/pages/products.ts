import { Category } from "@/types/Models/Category";
import { ProductsSlicerState } from "../../types/pages/products";
import { PayloadAction } from "@reduxjs/toolkit";
import { Brand } from "@/types/Models/Brand";


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
  setUpdatingCategory: (state: ProductsSlicerState, action: PayloadAction<Category>) => {
    state.updatingCategory = action.payload;
  },
  toggleUpdateBrandModalDisplay: (state: ProductsSlicerState) => {
    state.updateBrandModalDisplay = !state.updateBrandModalDisplay;
  },
  setUpdatingBrand: (state: ProductsSlicerState, action: PayloadAction<Brand>) => {
    state.updatingBrand = action.payload;
  }
}
