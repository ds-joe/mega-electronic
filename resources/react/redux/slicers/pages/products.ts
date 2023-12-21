// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../../initialStates/pages/products";

// Actions
import { productsActions } from "../../actions/pages/products";


const productsSlicer = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    ...productsActions
  }
});

export default productsSlicer.reducer;
export const { toggleCreateCategoryModalDisplay, toggleCreateBrandModalDisplay, toggleCreateProductModalDisplay, toggleUpdateCategoryModalDisplay, setUpdatingCategory, setUpdatingBrand, toggleUpdateBrandModalDisplay } = productsSlicer.actions;
