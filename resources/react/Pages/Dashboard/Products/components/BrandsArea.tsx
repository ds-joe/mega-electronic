// Dependencies
import { useMemo } from "react";

// Components
import { Card, Row, Col, Table, Dropdown } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import TableFilter from "@/Components/Tables/TableFilter";

// Redux
import { useDispatch } from "react-redux";
import { toggleCreateBrandModalDisplay, toggleUpdateBrandModalDisplay, setUpdatingBrand } from "@/redux/slicers/pages/products";

// Hooks
import useChart from "@/hooks/useChart";
import useToast from "@/hooks/useToast";
import { useForm, usePage } from "@inertiajs/react";
import useTable from "@/hooks/useTable";

// Utils
import colors from "~tailwind/colors";
import { barChartDataset, barChartOptions } from "@/utils/chart/custom/barChart";

// Types
import { ProductsProps } from "@/types/Pages/Products";
import { Brand } from "@/types/Models/Brand";

const BrandsArea: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<ProductsProps>;
  const dispatch = useDispatch();
  const { allowed_sort_columns, available_steps, data } = pageData.brands_table;
  const chart = pageData.brands_chart;
  const { createDatasetObject, createDataObject, createDatasetsArray } = useChart();
  const { patch } = useForm();
  const { confirmationToast } = useToast();
  const tableHook = useTable({ routeName: "brands.table", allowed_sort_columns, available_steps });

  // Handle open create brand modal function.
  const handleOpenCreateBrandModal = () => {
    dispatch(toggleCreateBrandModalDisplay());
  }

  // Handle open update brand modal
  const handleOpenUpdateBrandModal = (data: Brand) => {
    dispatch(toggleUpdateBrandModalDisplay());
    dispatch(setUpdatingBrand(data));
  }

  // Handle Remove Brand
  const handleRemoveBrand = (id: number) => {
    confirmationToast(pageWords?.do_you_want_delete_this_brand, () => {
      patch(route('brand.delete', {
        id
      }))
    })
  }

  const chartData = useMemo(() => createDataObject({
    ...createDataObject(),
    datasets: createDatasetsArray([
      createDatasetObject({
        ...barChartDataset,
        data: chart.data,
        backgroundColor: colors.primary,
      })
    ]),
    labels: chart.labels,
  }), []);


  return (
    <Row className="gap-5 lg:gap-0">

      {/** Start Table Card */}
      <Col xs="12" lg="7" className="self-stretch">
        <Card className="h-full">
          <Card.Body>
            <Card.Title>{pageWords?.brands_table}</Card.Title>
            <div className="mt-1 flex items-center justify-between gap-5 mb-4">
              <Card.Text>{pageWords?.brands_table_description}</Card.Text>
              <div className="btn-group w-fit text-end">
                <button className="btn btn-outline-primary w-fit btn-sm whitespace-nowrap" onClick={handleOpenCreateBrandModal}>{pageWords?.create_brand}</button>
              </div>
            </div>
            <TableFilter {...tableHook} searchPlaceholder={pageWords?.search_for_brand} />
          </Card.Body>
          <Card.Body className="max-h-[300px] overflow-y-auto make-scroll">
            <Table responsive >
              <thead>
                <tr>
                  <th>{pageWords?.no}</th>
                  <th>{pageWords?.name}</th>
                  <th>{pageWords?.created_by}</th>
                  <th>{pageWords?.created_at}</th>
                  <th><i className="fal fa-cogs" /></th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((brand) => (
                    <tr key={brand?.id}>
                      <td>{brand?.id}</td>
                      <td>{brand.name}</td>
                      <td>{brand.owner.full_name}</td>
                      <td>{brand.created_at}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle className="toggle-clean btn-sm">
                            <i className="fas fa-list-timeline" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleOpenUpdateBrandModal(brand)}>{pageWords?.edit}</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleRemoveBrand(brand.id as number)}>{pageWords?.delete}</Dropdown.Item>
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
      </Col>
      {/** End Table Card */}

      {/** Start Chart Card  */}
      <Col xs='12' lg="5">
        <Card>
          <Card.Body>
            <Card.Title>{pageWords?.brands}</Card.Title>
            <Card.Text>{pageWords?.brands_chart_description}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Bar height={350} data={chartData} options={barChartOptions} />
          </Card.Body>
        </Card>
      </Col>
      {/** End Chart Card  */}


    </Row>
  )
}

export default BrandsArea;
