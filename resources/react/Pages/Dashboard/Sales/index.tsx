// Dependencies
import Dashboard from "@/Layout/Dashboard";

// Hooks
import { usePage } from "@inertiajs/react";

// Components
import { Row, Col } from "react-bootstrap";
import StatesCards from "./components/StatesCards";
import Header from "@/Components/Layout/Header";
import SalesChart from "./components/SalesChart";
import SalesTable from "./components/SalesTable";


const Sales: RP = () => {
  const { pageWords } = usePage().props as ServerProps;

  return (
    <Dashboard pageTitle={pageWords?.sales}>
      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.sales} > </Header>
        </Col>
        <Col xs='12' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatesCards />
        </Col>
        <Col xs="12">
          <SalesChart />
        </Col>
        <Col xs="12">
          <SalesTable />
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Sales;
