// Dependencies
import { FCPage } from "@/types/App";
import Dashboard from "@/Layout/Dashboard";

// Components
import { Row, Col } from "react-bootstrap";
import StatesCards from "./components/StatesCards";
import Header from "@/Components/Layout/Header";
import SalesTable from "./components/SalesTable";

// Types
import { SalesProps } from "@/types/Pages/Sales";
import SalesChart from "./components/SalesChart";

const Sales: FCPage<SalesProps> = ({ pageWords, notification, sales, sales_status_cards, chart }) => {

  return (
    <Dashboard pageTitle={pageWords?.sales} notification={notification}>
      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.sales} > </Header>
        </Col>
        <Col xs='12' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatesCards pageWords={pageWords} {...sales_status_cards} />
        </Col>
        <Col xs="12">
          <SalesChart pageWords={pageWords} {...chart} />
        </Col>
        <Col xs="12">
          <SalesTable pageWords={pageWords} records={sales} />
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Sales;
