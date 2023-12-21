// @ts-nocheck
// Types
import { ChartDataset, ChartOptions } from "chart.js";

import colors from "~tailwind/colors";


export const lineChartDataset: ChartDataset<'line'> = {
  data: [],
  label: undefined,
  backgroundColor: 'transparent',
  borderWidth: 2,
  pointBorderWidth: 0,
  borderColor: 'blue'
} as const;

export const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'x',
  scales: {
    y: {
      ticks: {
        color: colors.primary,

        font: {
          weight: "500",
          family: 'Poppins, sans-serif',
          size: 11
        }
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
      }
    },
    x: {
      ticks: {
        color: colors.primary,

        font: {
          weight: "500",
          family: 'Poppins, sans-serif',
          size: 11
        }
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true
      }
    },
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          weight: "600",
          family: "Poppins, sans-serif"
        }
      }
    },
  }
}
