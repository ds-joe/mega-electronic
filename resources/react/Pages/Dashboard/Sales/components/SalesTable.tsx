// Dependencies
import { FCComponent } from "@/types/App";
import { useRef } from "react";

// Components
import { Dropdown, Card, Table } from "react-bootstrap";
import TableFilter from "@/Components/Tables/TableFilter";
import { Link } from "@inertiajs/react";

// Hooks
import useTable from "@/hooks/useTable";

// Types
import { SalesTableProps } from "@/types/Pages/Sales";
import { useForm } from "@inertiajs/react";
import useToast from "@/hooks/useToast";

const SalesTable: FCComponent<SalesTableProps> = ({ pageWords, records }) => {
  const tableEle = useRef<HTMLTableElement>(null);
  const tableHook = useTable(tableEle);
  const { patch } = useForm();
  const { confirmationToast } = useToast();

  // Handle remove sale
  const handleRemoveSale = (id: number) => {
    confirmationToast(pageWords?.do_you_want_delete_this_sale, () => {
      patch(route('sales.delete', {
        id
      }));
    });
  }

  return (
    <Card >
      <Card.Body>
        <Card.Title>{pageWords?.sales_table}</Card.Title>
        <div className="mt-1 flex items-center justify-between gap-5 mb-4">
          <Card.Text>{pageWords?.sales_table_description}</Card.Text>
          <div className="btn-group w-fit text-end">
            <Link href={route("sales.create.show")}>
              <button className="btn btn-outline-primary w-fit btn-sm whitespace-nowrap">{pageWords?.new_sale}</button>
            </Link>
          </div>
        </div>
        <TableFilter {...tableHook} searchPlaceholder={pageWords?.search_for_sale} />
      </Card.Body>
      <Card.Body>
        <Table responsive ref={tableEle}>
          <thead>
            <tr>
              <th>{pageWords?.no}</th>
              <th>{pageWords?.method}</th>
              <th>{pageWords?.amount}</th>
              <th>{pageWords?.discount}</th>
              <th>{pageWords?.result_amount}</th>
              <th>{pageWords?.customer}</th>
              <th>{pageWords?.created_by}</th>
              <th>{pageWords?.created_at}</th>
              <th><i className="fal fa-cogs" /></th>
            </tr>
          </thead>
          <tbody>
            {
              records.map((sale) => (
                <tr key={sale?.id}>
                  <td>{sale?.id}</td>
                  <td>{pageWords[`${sale?.method}`] && pageWords[`${sale?.method}`]}</td>
                  <td>$ {Number(sale.amount).toFixed(2)}</td>
                  <td>$ {Number(sale.discount).toFixed(2)}</td>
                  <td>$ {(Number(sale.amount) - Number(sale.discount)).toFixed(2)}</td>
                  <td>{sale?.customer.first_name} {sale?.customer.last_name}</td>
                  <td>{sale?.owner.full_name}</td>
                  <td>{sale?.created_at}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className="toggle-clean btn-sm">
                        <i className="fas fa-list-timeline" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>{pageWords?.edit}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRemoveSale(sale.id as number)}>{pageWords?.delete}</Dropdown.Item>
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

export default SalesTable;
