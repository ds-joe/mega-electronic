import Dashboard from "@/Layout/Dashboard";

// Redux
import { useDispatch } from "react-redux";
import { toggleCreateSaleModal } from "@/redux/slicers/pages/sales";

// Hooks
import { usePage } from "@inertiajs/react";

// Components
import { Row, Col, Button } from "react-bootstrap";
import Header from "@/Components/Layout/Header";
import ProductCard from "./components/ProductCard";
import CreateSaleModal from "./components/CreateSaleModal";
import FilterProductsContainer from "@/Components/Containers/FilterProductsContainer";

// Hooks
import useTable from "@/hooks/useTable";

// Types
import { SaleProps } from "@/types/Pages/Sales";

const Sale: RP = () => {
  const dispatch = useDispatch();
  const { pageWords, pageData } = usePage().props as ServerProps<SaleProps>;
  const { products, customers } = pageData;
  const tableHook = useTable({ routeName: "sale.products", available_steps: products.available_steps, allowed_sort_columns: products.allowed_sort_columns });

  // Handle open create sale modal.
  const handleOpenCreateSaleModal = () => {
    dispatch(toggleCreateSaleModal());
  }

  return (
    <Dashboard pageTitle={pageWords?.new_sale} >
      <CreateSaleModal customers={customers} />
      <Row className="gap-7">
        <Col xs='12'>
          <Header title={pageWords?.new_sale}>
            <Button variant="primary" className="btn-icon" onClick={handleOpenCreateSaleModal}>
              <i className="fas fa-check-circle" />
              {pageWords?.confirm_sale}
            </Button>
          </Header>
        </Col>

        <Col xs="12" >
          <FilterProductsContainer searchPlaceholder={pageWords?.search_for_product} {...tableHook} attributes={{
            className: "flex justify-center gap-4 flex-wrap"
          }}>
            {
              products?.data?.map((product) => <ProductCard key={product.id}  {...product} />)
            }
          </FilterProductsContainer>
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Sale;
