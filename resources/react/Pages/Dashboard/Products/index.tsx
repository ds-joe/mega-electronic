// Hooks
import { usePage } from "@inertiajs/react";

// Components
import Dashboard from "@/Layout/Dashboard";
import Header from "@/Components/Layout/Header";
import { Col, Row } from "react-bootstrap";
import StatusCards from "./components/StatusCards";
import CategoriesArea from "./components/CategoriesArea";
import CreateCategoryModal from "./components/CreateCategoryModal";
import ProductsChart from "./components/ProductsChart";
import BrandsArea from "./components/BrandsArea";
import CreateBrandModal from "./components/CreateBrandModal";
import ProductsTable from "./components/ProductsTable";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import CreateProductModal from "./components/CreateProduct";
import UpdateBrandModal from "./components/UpdateBrandModal";

const Products: RP = () => {
  const { pageWords } = usePage().props as ServerProps;

  return (
    <Dashboard pageTitle={pageWords?.products}>
      <CreateCategoryModal />
      <UpdateCategoryModal />
      <CreateBrandModal />
      <UpdateBrandModal />
      <CreateProductModal />

      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.products} />
        </Col>
        <Col xs='12' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatusCards />
        </Col>
        <Col xs='12'>
          <CategoriesArea />
        </Col>
        <Col xs="12">
          <ProductsChart />
        </Col>
        <Col xs="12">
          <BrandsArea />
        </Col>
        <Col xs="12">
          <ProductsTable />
        </Col>
      </Row>

    </Dashboard>
  )
}

export default Products;
