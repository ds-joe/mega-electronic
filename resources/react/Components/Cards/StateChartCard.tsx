// Dependencies
import { FC } from "react";

// Components
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Hooks
import useChart from "@/hooks/useChart";

// Types
import { StateChartCardProps } from "@/types/Components/Cards/StateChartCard";

const StateChartCard: FC<StateChartCardProps> = ({ title, chartType, chartData, value }) => {
  const { createOptionsObject, structure } = useChart();
  const words = useSelector((state: RootState) => state.layout.layoutsWords.dashboard);

  const chartOptions = createOptionsObject({
    ...structure.options,
    maintainAspectRatio: true,
    scales: {
      ...structure.options.scales,
      y: {
        display: false
      },
      x: {
        display: false
      }
    },
    plugins: {
      ...structure.options.plugins,
      legend: {
        display: false,
      },
    }
  });

  return (
    <Card className="pf-state-card">
      <Card.Body>
        <div className="pf-state-card-head">
          <Card.Title className="pf-state-card-title">{title}</Card.Title>
          <Dropdown>
            <Dropdown.Toggle as={'h1'} className="toggle-clean">
              <i className="fal fa-cog dark:text-white" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="far fa-refresh icon" />
                {words?.refresh}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row className="pf-state-card-body">
          <Col className="pf-state-card-states-area" xs="5">
            <h3 className="pf-state-card-value">{value}</h3>
          </Col>
          <Col className="pf-state-card-chart-area" xs="7">
            {chartType === "bar" && <Bar data={chartData} options={chartOptions} />}
            {chartType === "line" && <Line data={chartData} options={chartOptions} />}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default StateChartCard;
