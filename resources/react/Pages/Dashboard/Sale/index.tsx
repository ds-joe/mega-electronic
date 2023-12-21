// Dependencies
import { FCPage } from "@/types/App";
import Dashboard from "@/Layout/Dashboard";

// Redux
import { useDispatch } from "react-redux";
import { toggleCreateSaleModal } from "@/redux/slicers/pages/sales";

// Components
import { Row, Col, Button } from "react-bootstrap";
import Header from "@/Components/Layout/Header";
import ProductCard from "./components/ProductCard";
import CreateSaleModal from "./components/CreateSaleModal";

// Types
import { SaleProps } from "@/types/Pages/Sales";

const Sale: FCPage<SaleProps> = ({ pageWords, notification, products, customers }) => {
  const dispatch = useDispatch();

  // Handle open create sale modal.
  const handleOpenCreateSaleModal = () => {
    dispatch(toggleCreateSaleModal());
  }

  return (
    <Dashboard pageTitle={pageWords?.new_sale} notification={notification}>
      <CreateSaleModal pageWords={pageWords} customers={customers} />
      <Row className="gap-7">
        <Col xs='12'>
          <Header title={pageWords?.new_sale}>
            <Button variant="success" className="btn-icon" onClick={handleOpenCreateSaleModal}>
              <i className="fas fa-check-circle" />
              {pageWords?.confirm_sale}
            </Button>
          </Header>
        </Col>
        <Col xs="12" className="flex gap-3 flex-wrap">
          {
            products.map((product) => <ProductCard key={product.id} pageWords={pageWords} {...product} />)
          }
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Sale;
