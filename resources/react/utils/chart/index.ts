// Chart Structure
import { dataset } from "./structure/dataset";
import { data } from "./structure/data";
import { options } from "./structure/options";

// Chart Utils
import { hoursOfDay, daysOfWeek, monthsOfYear } from "./date";

// Structure
const structure = {
  dataset,
  data,
  options,
} as const;

// Utils
const utils = {
  date: { hoursOfDay, daysOfWeek, monthsOfYear }
} as const

export {
  structure,
  utils
}

