// Dependencies
import Dashboard from "@/Layout/Dashboard";

// Hooks
import { usePage } from "@inertiajs/react";

// Components
import { Row, Col } from "react-bootstrap";
import Header from "@/Components/Layout/Header";
import UpdateExpenseModal from "./components/UpdateExpenseModal";
import CreateExpenseModal from "./components/CreateExpenseModal";
import ExpensesTable from "./components/ExpensesTable";

const Expenses: RP = () => {
  const { pageWords } = usePage().props as ServerProps;

  return (

    <Dashboard pageTitle={pageWords?.expenses}>
      <UpdateExpenseModal />
      <CreateExpenseModal />
      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.expenses} />
        </Col>
        <Col xs='12' >
          <ExpensesTable />
        </Col>
      </Row>
    </Dashboard >
  )
}

export default Expenses;
