import { Customer } from "../Models/Customer";
import { Product } from "../Models/Product";
import { Sale } from "../Models/Sale";
import { User } from "../Models/User";

type SalesWithAdditionData = Sale & {
  owner: User,
  customer: Customer
};

export type SalesProps = {
  sales: Array<SalesWithAdditionData>,
  sales_status_cards: {
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
  }
}

export type SalesTableProps = {
  records: SalesProps['sales']
}

export type SalesStatesCardsProps = SalesProps['sales_status_cards'];

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
