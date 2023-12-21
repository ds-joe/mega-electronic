// Types
import { CalculatePrefixes } from "@/types/Hooks/Numbers";

/**
  * @developer Dev Youssef
  * @description This hook using to create ( Random Numbers, get result of array, .....)
  * @github https://github.com/dsc-youssef
  * @facebook https://www.facebook.com/YoussefBibawy1/
*/
const useNumbers = () => {
  /**
    * @desc This function using to create an array of random numbers.
    * @param { number } min
    * @param { number } max
    * @param { boolean } floating
    * @return number[]
  */
  const randNumbers = (min: number, max: number, floating: boolean = true, length: number = 1): number[] => Array.from({ length }, _ => (floating ? Number((Math.random() * (max - min) + min).toFixed(2)) : Number((Math.random() * (max - min) + min).toFixed(0))));

  /**
   * @desc This function using to calculate array numbers and return result.
   * @example if you give this function array = [2, 4, 4] and prefix = "+" will calculate numbers in array and return (10).
   * @param { number[] } array
   * @param { CalculatePrefixes } prefix
   * @param { number } fixed
   * @return number
  */
  const arrayResult = (array: number[], prefix: CalculatePrefixes = "+", fixed: number = 2): number => Number(array.reduce((a: number, b: number) => eval(`${a} ${prefix} ${b}`)).toFixed(fixed));

  /**
   * @desc This function using to change number format.
   * @example if you give this function (1000) will return (1k).
   * @param { number } num
   * @return string
  */
  const formatNumber = (num: number) => {
    const absNum = Math.abs(num);
    const suffixes = ["", "K", "M", "B", "T", "Q", "S", "SX", "SP", "O"];
    const suffixNum = Math.floor(Math.log10(absNum) / 3);
    const shortNum = (suffixNum === 0 ? absNum : absNum / Math.pow(10, suffixNum * 3)).toFixed(1 + Number(absNum >= 100));
    return (num < 0 ? "-" : "") + shortNum + suffixes[suffixNum];
  }

  /**
   * @desc This function using to get the result percent of total number.
   * @example if you have ( 1000 dollar ) and you buy products for ( 200 dollar ) now you spent 20% from total amount ( 1000 dollar ) this function will return the how many you spent in percent of total amount.
   * @param { number } input
   * @param { number } total
   * @return number
  */
  const resultPercent = (input: number, total: number): number => (input / total) * 100;


  return {
    randNumbers,
    arrayResult,
    formatNumber,
    resultPercent
  }
}

export default useNumbers;

