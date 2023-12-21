// @ts-nocheck

// Types
import { ChartDataset, ChartOptions } from "chart.js";

import colors from "~tailwind/colors";

export const barChartDataset: ChartDataset<"bar"> = {
  label: undefined,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 50,
  data: [],
  barThickness: 15,
  maxBarThickness: 20
} as const;

export const barChartOptions: ChartOptions<'bar'> = {
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
          family: "Poppins, sans-serif",

        }
      }
    },
  }
}
