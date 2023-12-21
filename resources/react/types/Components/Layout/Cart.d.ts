import { Product } from "@/types/Models/Product";

export type CartProductProps = Product & {
  quantity: number
}
