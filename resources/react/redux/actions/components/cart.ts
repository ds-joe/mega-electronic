import { CartSlicerState } from "../../types/components/cart";
import { PayloadAction } from "@reduxjs/toolkit";
import { CartProductProps } from "@/types/Components/Layout/Cart"

export const cartActions = {
  toggleOpen: (state: CartSlicerState) => {
    state.isOpen = !state.isOpen;
  },
  addProduct: (state: CartSlicerState, action: PayloadAction<CartProductProps>) => {
    const product = state.products.findIndex((product) => product.id === action.payload.id);
    if (product >= 0) {
      state.products[product].quantity = Number(state.products[product].quantity) + 1;
    } else {
      state.products = [...state.products, action.payload];
    }
  },
  setCartMode: (state: CartSlicerState, action: PayloadAction<CartSlicerState['mode']>) => {
    state.mode = action.payload;
  },
  removeProduct: (state: CartSlicerState, action: PayloadAction<number>) => {
    state.products = state.products.filter((product: CartProductProps) => product.id !== action.payload);
  },
  clearCart: (state: CartSlicerState) => {
    state.products = [];
  },
  setProductQuantity: (state: CartSlicerState, action: PayloadAction<CartProductProps>) => {
    state.products = state.products.filter((product) => {
      if (product.id === action.payload.id) {
        product.quantity = Number(action.payload.quantity);
      }
      return product;
    })
  }

}
