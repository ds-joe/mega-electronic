// Dependencies
import { FCComponent } from "@/types/App";
import { useRef } from "react";

// Redux
import { useDispatch } from "react-redux";
import { toggleCreateCustomerModalDisplay, setUpdatingCustomer, toggleUpdateCustomerModalDisplay } from "@/redux/slicers/pages/customers";

// Components
import { Dropdown, Card, Table } from "react-bootstrap";
import TableFilter from "@/Components/Tables/TableFilter";

// Hooks
import useTable from "@/hooks/useTable";

// Types
import { CustomersTableProps } from "@/types/Pages/Customers";
import { Customer } from "@/types/Models/Customer";
import { useForm } from "@inertiajs/react";
import useToast from "@/hooks/useToast";

const CustomersTable: FCComponent<CustomersTableProps> = ({ pageWords, records }) => {
  const dispatch = useDispatch();
  const tableEle = useRef<HTMLTableElement>(null);
  const tableHook = useTable(tableEle);
  const { patch } = useForm();
  const { confirmationToast } = useToast();

  // Handle open modal
  const handleOpenCreateModal = () => {
    dispatch(toggleCreateCustomerModalDisplay());
  }

  // Handle update customer
  const handleUpdateCustomer = (customer: Customer) => {
    dispatch(toggleUpdateCustomerModalDisplay());
    dispatch(setUpdatingCustomer(customer));
  }

  // Handle remove customer
  const handleRemoveCustomer = (id: number) => {
    confirmationToast(pageWords?.do_you_want_delete_this_customer, () => {
      patch(route('customer.delete', {
        id
      }));
    });
  }

  return (
    <Card >
      <Card.Body>
        <Card.Title>{pageWords?.customers_table}</Card.Title>
        <div className="mt-1 flex items-center justify-between gap-5 mb-4">
          <Card.Text>{pageWords?.customers_table_description}</Card.Text>
          <div className="btn-group w-fit text-end">
            <button className="btn btn-outline-primary w-fit btn-sm whitespace-nowrap" onClick={handleOpenCreateModal}>{pageWords?.create_customer}</button>
          </div>
        </div>
        <TableFilter {...tableHook} searchPlaceholder={pageWords?.search_for_customer} />
      </Card.Body>
      <Card.Body>
        <Table responsive ref={tableEle}>
          <thead>
            <tr>
              <th>{pageWords?.no}</th>
              <th>{pageWords?.first_name}</th>
              <th>{pageWords?.last_name}</th>
              <th>{pageWords?.email}</th>
              <th>{pageWords?.phone}</th>
              <th>{pageWords?.created_by}</th>
              <th>{pageWords?.created_at}</th>
              <th><i className="fal fa-cogs" /></th>
            </tr>
          </thead>
          <tbody>
            {
              records.map((customer) => (
                <tr key={customer?.id}>
                  <td>{customer?.id}</td>
                  <td>{customer?.first_name}</td>
                  <td>{customer?.last_name}</td>
                  <td>{customer?.email ? customer?.email : "~"}</td>
                  <td>{customer?.phone ? customer?.phone : "~"}</td>
                  <td>{customer?.owner?.full_name}</td>
                  <td>{customer?.created_at}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className="toggle-clean btn-sm">
                        <i className="fas fa-list-timeline" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleUpdateCustomer(customer)}>{pageWords?.edit}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRemoveCustomer(customer.id as number)}>{pageWords?.delete}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default CustomersTable;
