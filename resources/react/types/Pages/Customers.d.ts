import { UseTableResponseData } from "../Hooks/useTable";
import { Customer } from "../Models/Customer";
import { User } from "../Models/User";

type CustomersWithOwner = Customer & {
  owner: User
};
export type CustomersTableProps = UseTableResponseData<CustomersWithOwner>;

export type CustomersProps = {
  customers_table: CustomersTableProps,
}

