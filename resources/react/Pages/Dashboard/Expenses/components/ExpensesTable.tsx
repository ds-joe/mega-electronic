// Redux
import { useDispatch } from "react-redux";
import {
  setUpdatingExpense,
  toggleCreateExpenseModal,
  toggleUpdateExpenseModal
} from "@/redux/slicers/pages/expenses";

// Components
import { Dropdown, Card, Table } from "react-bootstrap";
import TableFilter from "@/Components/Tables/TableFilter";

// Hooks
import useTable from "@/hooks/useTable";
import { useForm, usePage } from "@inertiajs/react";

// Types
import { ExpensesProps } from "@/types/Pages/Expenses";
import { Expense } from "@/types/Models/Expense";
import useToast from "@/hooks/useToast";

const ExpensesTable: RC = () => {
  const dispatch = useDispatch();
  const { pageWords, pageData } = usePage().props as ServerProps<ExpensesProps>;
  const { allowed_sort_columns, available_steps, data } = pageData.expenses_table;
  const tableHook = useTable({
    routeName: "expenses.table",
    allowed_sort_columns,
    available_steps,
  });

  const { patch } = useForm();
  const { confirmationToast } = useToast();

  // Handle open update modal.
  const handleOpenUpdateModal = (expense: Expense) => {
    dispatch(setUpdatingExpense(expense));
    dispatch(toggleUpdateExpenseModal());
  };

  // handle delete
  const handleDelete = (id: number) => {
    confirmationToast(pageWords?.do_you_want_delete_this_expense, () => {
      patch(
        route("expenses.delete", {
          id,
        })
      );
    });
  };

  // Handle open create model
  const handleOpenCreateModal = () => {
    dispatch(toggleCreateExpenseModal());
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{pageWords?.expenses_table}</Card.Title>
        <div className="mt-1 flex items-center justify-between gap-5 mb-4">
          <Card.Text>{pageWords?.expenses_table_description}</Card.Text>
          <div className="btn-group w-fit text-end">
            <button
              className="btn btn-outline-primary w-fit btn-sm whitespace-nowrap"
              onClick={handleOpenCreateModal}
            >
              {pageWords?.create_expense}
            </button>
          </div>
        </div>
        <TableFilter
          {...tableHook}
          searchPlaceholder={pageWords?.search_for_expense}
        />
      </Card.Body>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>{pageWords?.no}</th>
              <th>{pageWords?.amount}</th>
              <th>{pageWords?.date}</th>
              <th>{pageWords?.method}</th>
              <th>{pageWords?.created_by}</th>
              <th>{pageWords?.created_at}</th>
              <th>
                <i className="fal fa-cogs" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((expense) => (
              <tr key={expense?.id}>
                <td>{expense?.id}</td>
                <td>$ {expense?.amount}</td>
                <td>{expense.date}</td>
                <td>{pageWords[`${expense.method}`]}</td>
                <td>{expense.owner.full_name}</td>
                <td>{expense.created_at}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle className="toggle-clean btn-sm">
                      <i className="fas fa-list-timeline" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleOpenUpdateModal(expense)}
                      >
                        {pageWords?.edit}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDelete(expense.id as number)}
                      >
                        {pageWords?.delete}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpensesTable;
