// Dependencies
import Dashboard from "@/Layout/Dashboard";
import { FCPage } from "@/types/App";

// Components
import { Row, Col } from "react-bootstrap";
import CustomersTable from "./components/CustomersTable";
import CreateCustomerModal from "./components/CreateCustomerModal";
import Header from "@/Components/Layout/Header";
import UpdateCustomerModal from "./components/UpdateCustomerModal";

// Types
import { CustomersProps } from "@/types/Pages/Customers";

const Customers: FCPage<CustomersProps> = ({ pageWords, customers, notification }) => {
  return (
    <Dashboard pageTitle={pageWords?.customers} notification={notification}>
      <CreateCustomerModal pageWords={pageWords} />
      <UpdateCustomerModal pageWords={pageWords} />
      <Row className="gap-7">
        <Col xs='12'>
          <Header title={pageWords?.customers} />
        </Col>
        <Col xs='12'>
          <CustomersTable pageWords={pageWords} records={customers} />
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Customers;
