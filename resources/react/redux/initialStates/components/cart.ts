import { CartSlicerState } from "@/redux/types/components/cart";

export const initialState: CartSlicerState = {
  isOpen: false,
  products: [],
  mode: 'create'
};
