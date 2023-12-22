
// Redux
import { useDispatch } from "react-redux";
import { toggleCreateProductModalDisplay } from "@/redux/slicers/pages/products";

// Components
import { Dropdown, Card, Table } from "react-bootstrap";
import TableFilter from "@/Components/Tables/TableFilter";

// Hooks
import useTable from "@/hooks/useTable";
import { usePage } from "@inertiajs/react";

// Types
import { ProductsProps } from "@/types/Pages/Products";

const ProductsTable: RC = () => {
  const dispatch = useDispatch();
  const { pageWords, pageData } = usePage().props as ServerProps<ProductsProps>;
  const { allowed_sort_columns, available_steps, data } = pageData.products_table;
  const tableHook = useTable({ routeName: "products.table", allowed_sort_columns, available_steps, });

  const handleOpenCreateModal = () => {
    dispatch(toggleCreateProductModalDisplay());
  }

  return (
    <Card >
      <Card.Body>
        <Card.Title>{pageWords?.products_table}</Card.Title>
        <div className="mt-1 flex items-center justify-between gap-5 mb-4">
          <Card.Text>{pageWords?.products_table_description}</Card.Text>
          <div className="btn-group w-fit text-end">
            <button className="btn btn-outline-primary w-fit btn-sm whitespace-nowrap" onClick={handleOpenCreateModal}>{pageWords?.create_product}</button>
          </div>
        </div>
        <TableFilter {...tableHook} searchPlaceholder={pageWords?.search_for_product} />
      </Card.Body>
      <Card.Body>
        <Table responsive >
          <thead>
            <tr>
              <th>{pageWords?.no}</th>
              <th>{pageWords?.sku}</th>
              <th>{pageWords?.name}</th>
              <th>{pageWords?.price}</th>
              <th>{pageWords?.rate}</th>
              <th>{pageWords?.category}</th>
              <th>{pageWords?.brand}</th>
              <th>{pageWords?.created_by}</th>
              <th>{pageWords?.created_at}</th>
              <th><i className="fal fa-cogs" /></th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((product) => (
                <tr key={product?.id}>
                  <td>{product?.id}</td>
                  <td>{product?.sku}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.rate}</td>
                  <td>{product.category.name}</td>
                  <td>{product.brand.name}</td>
                  <td>{product.owner.full_name}</td>
                  <td>{product.created_at}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className="toggle-clean btn-sm">
                        <i className="fas fa-list-timeline" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>{pageWords?.edit}</Dropdown.Item>
                        <Dropdown.Item>{pageWords?.delete}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default ProductsTable;
