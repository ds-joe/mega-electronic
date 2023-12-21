import { Brand } from "../Models/Brand"
import { Category } from "../Models/Category"
import { Product } from "../Models/Product"
import { User } from "../Models/User"

// Categories
export type CategoriesDataProps = {
  table: Array<Category & {
    created_owner: User
  }>,
  chart: {
    labels: Array<string>,
    data: Array<number>
  }
}

// Brands
export type BrandsDataProps = {
  table: Array<Brand & {
    created_owner: User
  }>,
  chart: {
    labels: Array<string>,
    data: Array<number>
  }
}


// Products
export type CreateProductModalProps = {
  categories: Array<Category>;
  brands: Array<Brand>
}

export type ProductsTableProps = {
  table: Array<Product & {
    category: Category,
    brand: Brand,
    created_owner: User
  }>,
}

export type ProductsChartProps = {
  chart: {
    today: {
      data: Array<number>,
      labels: Array<string>
    },
    weekly: {
      data: Array<number>,
      labels: Array<string>
    },
    monthly: {
      data: Array<number>,
      labels: Array<string>
    },
    yearly: {
      data: Array<number>,
      labels: Array<string>
    }
  }
}

export type ProductsDataProps = ProductsTableProps & ProductsChartProps;

// Special

export type StateCardsProps = {
  categories: number,
  brands: number,
  products: number
}

export type ProductsProps = {
  state_cards: StateCardsProps,
  categories: CategoriesDataProps,
  brands: BrandsDataProps,
  products: ProductsDataProps
}


