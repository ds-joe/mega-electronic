// Dependencies
import { FCPage } from "@/types/App";

// Components
import Dashboard from "@/Layout/Dashboard";
import Header from "@/Components/Layout/Header";
import { Col, Row } from "react-bootstrap";
import StateCards from "./components/StateCards";
import CategoriesArea from "./components/CategoriesArea";
import CreateCategoryModal from "./components/CreateCategoryModal";
import ProductsChart from "./components/ProductsChart";
import BrandsArea from "./components/BrandsArea";
import CreateBrandModal from "./components/CreateBrandModal";
import ProductsTable from "./components/ProductsTable";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import CreateProductModal from "./components/CreateProduct";
import UpdateBrandModal from "./components/UpdateBrandModal";

// Types
import { ProductsProps } from "@/types/Pages/Products";

const Products: FCPage<ProductsProps> = ({ notification, pageWords, state_cards, categories, brands, products }) => {

  return (
    <Dashboard pageTitle="Products" notification={notification}>
      <CreateCategoryModal pageWords={pageWords} />
      <UpdateCategoryModal pageWords={pageWords} />
      <CreateBrandModal pageWords={pageWords} />
      <UpdateBrandModal pageWords={pageWords} />
      <CreateProductModal pageWords={pageWords} brands={brands.table} categories={categories.table} />

      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.products} />
        </Col>
        <Col xs='12' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StateCards pageWords={pageWords} products={state_cards.products} categories={state_cards.categories} brands={state_cards.brands} />
        </Col>
        <Col xs='12'>
          <CategoriesArea pageWords={pageWords} table={categories.table} chart={categories.chart} />
        </Col>
        <Col xs="12">
          <ProductsChart pageWords={pageWords} chart={products.chart} />
        </Col>
        <Col xs="12">
          <BrandsArea pageWords={pageWords} table={brands.table} chart={brands.chart} />
        </Col>
        <Col xs="12">
          <ProductsTable pageWords={pageWords} table={products.table} />
        </Col>
      </Row>

    </Dashboard>
  )
}

export default Products;
