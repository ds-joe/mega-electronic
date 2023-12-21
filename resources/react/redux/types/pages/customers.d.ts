import { Customer } from "@/types/Models/Customer"

export type CustomersSlicerState = {
  createCustomerModalDisplay: boolean,
  updateCustomerModalDisplay: boolean,
  updatingCustomer: Customer
}
