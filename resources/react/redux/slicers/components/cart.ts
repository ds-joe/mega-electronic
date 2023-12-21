// Redux
import { createSlice } from "@reduxjs/toolkit";

// State
import { initialState } from "../../initialStates/components/cart";

// Actions
import { cartActions } from "../../actions/components/cart";


const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ...cartActions
  }
});

export default cartSlicer.reducer;
export const { toggleOpen, addProduct, setCartMode, removeProduct, setProductQuantity, clearCart } = cartSlicer.actions;
