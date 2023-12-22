import { UseTableResponseData } from "../Hooks/useTable"
import { Brand } from "../Models/Brand"
import { Category } from "../Models/Category"
import { Product } from "../Models/Product"
import { User } from "../Models/User"

// Categories
type CategoriesProps = {
  categories_table: UseTableResponseData<Category & {
    owner: User
  }>,
  categories_chart: {
    labels: Array<string>,
    data: Array<number>
  }
}

// Brands
type BrandsProps = {
  brands_table: UseTableResponseData<Brand & {
    owner: User
  }>,
  brands_chart: {
    labels: Array<string>,
    data: Array<number>
  }
}


// Products
type CreateProductModalProps = {
  categories: Array<Category>;
  brands: Array<Brand>
}

type ProductsTableProps = {
  products_table: UseTableResponseData<Product & {
    category: Category,
    brand: Brand,
    owner: User
  }>,
}

type ProductsChartProps = {
  products_chart: {
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

type StatusCardsProps = {
  status_cards: {
    categories: number,
    brands: number,
    products: number
  }
}

export type ProductsProps = CategoriesProps & ProductsChartProps & CreateProductModalProps & StatusCardsProps & BrandsProps & ProductsTableProps & ProductsChartProps;
