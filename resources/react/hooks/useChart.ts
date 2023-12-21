// Dependencies
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

// Types
import { ChartData, ChartOptions, ChartDataset } from 'chart.js';

// Chart Structure & Utils
import { structure, utils } from "@/utils/chart";

/**
 * @developer `Dev Youssef`
 * @description This hook using to control chart ( data, options, gradients, ...)
 * @documentation  https://www.chartjs.org/docs/latest/
 * @github https://github.com/dsc-youssef
 * @facebook https://www.facebook.com/YoussefBibawy1/
 */
const useChart = () => {

  // This Function using To avoid CategoryScale Error ( IMPORTANT )
  Chart.register(CategoryScale);

  /**
   * @desc This Function using To Create Chart Data Object
   * @param { ChartData } data
   * @default chartData
   * @return `ChartData`
   */
  const createDataObject = (data: ChartData = structure.data): ChartData<any> => data;

  /**
   * @desc This Function using To Create Chart Options.
   * @param { ChartOptions } options
   * @default chartOptions
   * @return `ChartOptions`
   */
  const createOptionsObject = (options: ChartOptions = structure.options): ChartOptions<any> => options;

  /**
   * @desc This Function using To Create a Dataset Object.
   * @param  { ChartDataset } dataset
   * @default chartDataset
   * @return `ChartDataset`
   */
  const createDatasetObject = (dataset: ChartDataset = structure.dataset): ChartDataset<any> => dataset;

  /**
   * @desc This Function using To Create Array Of Dataset Objects.
   * @param { ChartDataset[] } datasets
   * @return `ChartDataset[]`
  */
  const createDatasetsArray = (datasets: ChartDataset[]): ChartDataset<any>[] => datasets;

  /**
   * @desc This Function using To Create a Linear Gradient Background or Shadow.
   * @tip This Function using in `backgroundColor` property inside chart `dataset`.
   * @tip You Need To Change property `fill` from `false` => `true` to working.
   * @param { string } color1
   * @param { string } color2
   * @param { number } x1
   * @param { number } x2
   * @param { number } y1
   * @param { number } y2
   * @return `CanvasGradient`
   */
  const createLinearGradient = (color1: string, color2: string, x1: number = 0, x2: number = 0, y1: number = 0, y2: number = 500): CanvasGradient => {
    const ctx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
    const gradient = ctx.createLinearGradient(x1, x2, y1, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  }


  return {
    structure,
    utils,
    createDataObject,
    createOptionsObject,
    createDatasetObject,
    createDatasetsArray,
    createLinearGradient
  }
}

export default useChart;
