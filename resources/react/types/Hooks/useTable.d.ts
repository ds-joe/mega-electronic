import { ExcludeKey } from "../Utils";

export type UseTableData = {
  currentStep: number,
  recordsByStep: number,
  sortBy: null | string,
  reverse: boolean,
  searchQuery: string | number | null
}

export type UseTableProps = {
  routeName: string;
} & ExcludeKey<UseTableResponseData, 'data'>

export type UseTableResponseData<T = any> = {
  data: Array<T> | null,
  available_steps: number,
  allowed_sort_columns: Array<string>
}

