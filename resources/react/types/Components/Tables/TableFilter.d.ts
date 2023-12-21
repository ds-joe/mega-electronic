import { SetStateAction } from "react";

export interface TableFilterProps {
  tableSearch: (needle: string) => void;
  setTableLimit: (limit: SetStateAction<number>) => void;
  currentTab: number;
  tableLimit: number;
  searchPlaceholder?: string;
  toNextTab: () => void;
  toPrevTab: () => void;
  resetCurrentTab: () => void;
  setTabLimit: () => void;
  getTabsLength: () => number;
}
