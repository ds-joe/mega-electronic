// Components
import Dashboard from "@/Layout/Dashboard";
import { UpdateSaleProps } from "@/types/Pages/Sales";
import FilterProductsContainer from "@/Components/Containers/FilterProductsContainer";

// Redux
import { useDispatch } from "react-redux";
import { clearCart, setCartMode, addProduct } from "@/redux/slicers/components/cart";
import { toggleUpdateSaleModal } from "@/redux/slicers/pages/sales";

// Hooks
import { usePage } from "@inertiajs/react";
import useTable from "@/hooks/useTable";
import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ProductCard from "../Sale/components/ProductCard";
import Header from "@/Components/Layout/Header";
import UpdateSaleModal from "./components/UpdateSaleModal";

const UpdateSalePage: RP = () => {
  const dispatch = useDispatch();
  const { pageData, pageWords } = usePage().props as ServerProps<UpdateSaleProps>
  const { sale, products } = pageData;
  const tableHook = useTable({ routeName: "sale.products", available_steps: products.available_steps, allowed_sort_columns: products.allowed_sort_columns });

  // Handle open modal
  const handleOpenModal = () => {
    dispatch(toggleUpdateSaleModal());
  }

  useEffect(() => {
    dispatch(clearCart());
    dispatch(setCartMode('update'));
    sale.products.map((product) => {
      dispatch(addProduct({ ...product, quantity: Number(product.pivot.quantity) }));
    });

    // Clean up the cart when user leave page.
    return () => {
      dispatch(clearCart());
      dispatch(setCartMode('create'))
    }
  }, [sale]);

  return (
    <Dashboard pageTitle={pageWords?.update_sale}>
      <UpdateSaleModal />
      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.update_sale}>
            <Button variant="primary" className="btn-icon" onClick={handleOpenModal} >
              <i className="fas fa-check-circle" />
              {pageWords?.confirm_update}
            </Button>
          </Header>
        </Col>

        <Col xs="12">
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

export default UpdateSalePage;
