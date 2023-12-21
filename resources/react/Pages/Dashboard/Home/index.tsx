// Dependencies
import { FCPage } from "@/types/App";

// Components
import Dashboard from "@/Layout/Dashboard";
import { Row, Col } from "react-bootstrap";
import StateCards from "./components/StateCards";
// import StateChart from "./Components/StateChart";
import Header from "@/Components/Layout/Header";

// Types
const Home: FCPage = ({ pageWords }) => {

  return (
    <Dashboard pageTitle={pageWords?.dashboard}>
      <Row className="gap-7">
        <Col xs={"12"}>
          <Header title={pageWords?.dashboard} />
        </Col>
        <Col xs="12" className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <StateCards pageWords={pageWords} />
        </Col>
        <Col xs="12">
          {/* <StateChart pageWords={pageWords} /> */}
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Home;
