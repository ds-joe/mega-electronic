// Dependencies
import { FC, useMemo } from "react";

// Components
import { Line } from "react-chartjs-2";

// Hooks
import useChart from "@/hooks/useChart";
import useNumbers from "@/hooks/useNumbers";
import { Card, Dropdown } from "react-bootstrap";

// Utils
import colors from "~tailwind/colors";

// Types
import { PageWords } from "@/types/Server";

const StateChart: FC<PageWords> = ({ pageWords }) => {
  const { randNumbers } = useNumbers();
  const { structure, createOptionsObject, createDatasetObject, createDataObject, createDatasetsArray, utils } = useChart();

  const chartData = useMemo(() => createDataObject({
    ...createDataObject(),
    datasets: createDatasetsArray([
      createDatasetObject({
        ...createDatasetObject(),
        data: randNumbers(1000, 20421, true, 7),
        label: pageWords?.expenses,
        borderColor: colors.info,
        borderWidth: 2,
        pointBorderWidth: 0,
        backgroundColor: 'transparent',
      })
    ]),
    labels: utils.date.daysOfWeek,
  }), []);

  const chartOptions = createOptionsObject({
    ...structure.options,
    plugins: {
      ...structure.options.plugins,
      legend: {
        display: false
      }
    }
  });

  return (
    <Card>
      <Card.Body>
        <div className={"flex items-center justify-between"}>
          <Card.Title className={"uppercase"}>{pageWords?.revenue}</Card.Title>
          <Dropdown>
            <Dropdown.Toggle as={'h1'} className="toggle-clean">
              <i className="fal fa-cog" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="far fa-refresh icon" />
                {pageWords?.refresh}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-2 mt-3 gap-4"}>
          <Card.Text>
            {pageWords?.revenue_chart_text}
          </Card.Text>
          <div className="btn-group w-fit justify-self-end mt-1 h-fit">
            <button className="btn btn-outline-primary btn-sm">{pageWords?.today}</button>
            <button className="btn btn-primary btn-sm">{pageWords?.week}</button>
            <button className="btn btn-outline-primary btn-sm">{pageWords?.month}</button>
            <button className="btn btn-outline-primary btn-sm">{pageWords?.year}</button>
          </div>
        </div>
      </Card.Body>
      <Card.Body>
        <Line height={350} data={chartData} options={chartOptions} />
      </Card.Body>
    </Card>
  )
}

export default StateChart;
