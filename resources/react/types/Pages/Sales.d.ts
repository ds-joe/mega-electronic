import { Customer } from "../Models/Customer";
import { Product } from "../Models/Product";
import { Sale } from "../Models/Sale";
import { User } from "../Models/User";
import { UseTableResponseData } from "../Hooks/useTable";

type SalesOwnerCustomer = Sale & {
  owner: User,
  customer: Customer
};

export type SalesTableProps = UseTableResponseData<SalesOwnerCustomer>;
export type SalesStatusCardsProps = {
  payment: {
    total_amount: number,
    total_discount: number,
    total_sales: number
  },
  cash: {
    total_amount: number,
    total_discount: number,
    total_sales: number
  }
};

export type SalesChartProps = {
  payment: {
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
  },
  cash: {
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
};

export type SalesProps = {
  sales_table: SalesTableProps,
  sales_status_cards: SalesStatusCardsProps,
  sales_chart: SalesChartProps
}

/**
 * Sale Page
 */
export type SaleProps = {
  products: Array<Product>,
  customers: Array<Customer>,
}

export type SaleProductCardProps = Product;
export type CreateSaleModalProps = {
  customers: Array<Customer>
}
