// Dependencies
import { useMemo, useState } from "react";

// Components
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

// Hooks
import useChart from "@/hooks/useChart";
import { usePage } from "@inertiajs/react";

// Utils
import colors from "~tailwind/colors";
import { lineChartDataset, lineChartOptions } from "@/utils/chart/custom/lineChart";

// Types
import { ProductsProps } from "@/types/Pages/Products";

const ProductsChart: RC = () => {
  const { createDatasetObject, createDataObject, createDatasetsArray, createLinearGradient } = useChart();
  const [selectedTime, setSelectedTime] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const { pageWords, pageData } = usePage().props as ServerProps<ProductsProps>;
  const chart = pageData.products_chart;

  const chartData = useMemo(() => createDataObject({
    ...createDataObject(),
    datasets: createDatasetsArray([
      createDatasetObject({
        ...lineChartDataset,
        data: chart[`${selectedTime}`].data,
        borderColor: colors.primary,
        backgroundColor: createLinearGradient(`${colors.primary}40`, `${colors.primary}40`),
        fill: true
      })
    ]),
    labels: chart[`${selectedTime}`].labels,
  }), [selectedTime]);


  return (
    <Card>
      <Card.Body>
        <Card.Title >{pageWords?.products_chart}</Card.Title>
        <div className={"grid grid-cols-1 md:grid-cols-2 mt-1 gap-4"}>
          <Card.Text>
            {pageWords?.products_chart_description}
          </Card.Text>
          <div className="btn-group w-fit justify-self-end mt-1 h-fit">
            <button className={`btn btn-${selectedTime === "weekly" ? "primary" : 'outline-primary'} btn-sm`} onClick={() => setSelectedTime('weekly')}>{pageWords?.week}</button>
            <button className={`btn btn-${selectedTime === "monthly" ? "primary" : 'outline-primary'} btn-sm`} onClick={() => setSelectedTime('monthly')}>{pageWords?.month}</button>
            <button className={`btn btn-${selectedTime === "yearly" ? "primary" : 'outline-primary'} btn-sm`} onClick={() => setSelectedTime('yearly')}>{pageWords?.year}</button>
          </div>
        </div>
      </Card.Body>
      <Card.Body>
        <Line height={350} data={chartData} options={lineChartOptions} />
      </Card.Body>
    </Card>
  )
}

export default ProductsChart;
