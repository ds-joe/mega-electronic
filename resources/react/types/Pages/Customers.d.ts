import { Customer } from "../Models/Customer";
import { User } from "../Models/User";

type CustomersWithOwner = Customer & {
  owner: User
};

export type CustomersProps = {
  customers: Array<CustomersWithOwner>
}

export type CustomersTableProps = {
  records: CustomersProps['customers']
}
