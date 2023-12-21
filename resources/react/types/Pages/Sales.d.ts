import { Customer } from "../Models/Customer";
import { Product } from "../Models/Product";
import { Sale } from "../Models/Sale";
import { User } from "../Models/User";

type SalesWithAdditionData = Sale & {
  owner: User,
  customer: Customer
};

export type SalesProps = {
  sales: Array<SalesWithAdditionData>
}

export type SalesTableProps = {
  records: SalesProps['sales']
}

/**
 * Sale Page
 */
export type SaleProps = {
  products: Array<Product>,
  customers: Array<Customer>
}

export type SaleProductCardProps = Product;
export type CreateSaleModalProps = {
  customers: Array<Customer>
}
