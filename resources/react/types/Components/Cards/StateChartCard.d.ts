import { ChartData } from "chart.js";

export type StateChartCardProps = {
  title: string,
  value?: string | number,
  chartType?: 'bar' | 'line',
  chartData: ChartData<any>
}
