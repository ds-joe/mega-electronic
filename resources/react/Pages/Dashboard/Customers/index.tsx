// Dependencies
import Dashboard from "@/Layout/Dashboard";

// Hooks
import { usePage } from "@inertiajs/react";

// Components
import { Row, Col } from "react-bootstrap";
import CustomersTable from "./components/CustomersTable";
import CreateCustomerModal from "./components/CreateCustomerModal";
import Header from "@/Components/Layout/Header";
import UpdateCustomerModal from "./components/UpdateCustomerModal";

const Customers: RC = () => {
  const { pageWords } = usePage().props as ServerProps;

  return (
    <Dashboard pageTitle={pageWords?.customers} >
      <CreateCustomerModal />
      <UpdateCustomerModal />
      <Row className="gap-7">
        <Col xs='12'>
          <Header title={pageWords?.customers} />
        </Col>
        <Col xs='12'>
          <CustomersTable />
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Customers;
