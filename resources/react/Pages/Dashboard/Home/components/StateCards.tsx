// Dependencies
import { FC, useMemo } from "react";

// Hooks
import useChart from "@/hooks/useChart";
import useNumbers from "@/hooks/useNumbers";

// Utils
import colors from "~tailwind/colors";
import StateChartCard from "@/Components/Cards/StateChartCard";

// Types
import { PageWords } from "@/types/Server";

const StateCards: FC<PageWords> = ({ pageWords }) => {
  const { createDataObject, createLinearGradient, createDatasetObject, createDatasetsArray, utils } = useChart();
  const { randNumbers, formatNumber } = useNumbers();

  const chartData = useMemo(() => createDataObject({
    ...createDataObject(),
    datasets: createDatasetsArray([
      createDatasetObject({
        ...createDatasetObject(),
        data: randNumbers(1000, 20421, true, 7),
        label: pageWords?.customers,
        backgroundColor: colors.primary,
        borderWidth: 0,
        pointBorderWidth: 3,
      })
    ]),
    labels: utils.date.daysOfWeek,
  }), []);

  const chartData2 = useMemo(() => createDataObject({
    ...createDataObject(),
    datasets: createDatasetsArray([
      createDatasetObject({
        ...createDatasetObject(),
        data: randNumbers(1000, 20421, true, 7),
        label: pageWords?.orders,
        borderColor: colors.warning,
        backgroundColor: createLinearGradient(`${colors.warning}30`, `${colors.danger}30`),
        borderWidth: 3,
        pointBorderWidth: 0,
        fill: true
      })
    ]),
    labels: utils.date.daysOfWeek,
  }), []);


  const chartData3 = useMemo(() => createDataObject({
    ...createDataObject(),
    datasets: createDatasetsArray([
      createDatasetObject({
        ...createDatasetObject(),
        data: randNumbers(1000, 20421, true, 7),
        label: pageWords?.tickets,
        backgroundColor: colors.success,
        borderWidth: 0,
        pointBorderWidth: 3,
      })
    ]),
    labels: utils.date.daysOfWeek,
  }), []);



  return (
    <>
      <StateChartCard
        title={pageWords?.new_customers}
        value={formatNumber(randNumbers(120, 1500, false, 1)[0])}
        chartType={'bar'}
        chartData={chartData} />

      <StateChartCard
        title={pageWords?.new_orders}
        value={`$ ${formatNumber(randNumbers(1, 20000, true, 1)[0])}`}
        chartType={'line'}
        chartData={chartData2} />

      <StateChartCard
        title={pageWords?.new_tickets}
        value={`$ ${formatNumber(randNumbers(1, 20000, true, 1)[0])}`}
        chartType={'bar'}
        chartData={chartData3} />
    </>
  )
}

export default StateCards;
