import { CartProductProps } from "@/types/Components/Layout/Cart"

export type CartSlicerState = {
  isOpen: boolean,
  products: Array<CartProductProps>,
  mode: 'update' | 'create'
}
