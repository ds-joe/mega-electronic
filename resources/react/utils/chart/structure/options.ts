// Types
import type { ChartOptions } from 'chart.js';

export const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'x',
  scales: {
    y: {
      ticks: {
        // color: 'skyblue',
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
        // color: 'skyblue',
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
      display: true,
      labels: {
        // color: 'skyblue',
        font: {
          weight: "600",
          family: "Poppins, sans-serif"
        }
      }
    },
    subtitle: {
      display: false,
      text: 'Custom Chart Subtitle'
    }
  }
}

export default options;
