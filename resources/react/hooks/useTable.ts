// Dependencies
import { useState, RefObject } from "react";


/**
 * @desc This hook using to control table ( limit, search, .....).
 * @author Dev.Youssef
 * @github https://github.com/dsc-youssef
 * @facebook https://www.facebook.com/YoussefBibawy1/
 * @param { RefObject<HTMLTableElement>} table
 * @returns
 */
const useTable = (table: RefObject<HTMLTableElement>) => {

  const [tableLimit, setTableLimit] = useState<number>(50);
  const [currentTab, setCurrentTab] = useState<number>(1);
  const tabAttribute: string = "tab-effect",
    searchAttribute: string = "search-effect";

  /**
   * Get table rows.
   * @return { NodeListOf<HTMLTableRowElement> }
   */
  const getTableRows = (): NodeListOf<HTMLTableRowElement> => table.current?.querySelectorAll("tbody tr") as NodeListOf<HTMLTableRowElement>;

  /**
   * Get row cells.
   * @param { HTMLTableRowElement } row
   * @return { NodeListOf<HTMLTableCellElement> }
   */
  const getRowCells = (row: HTMLTableRowElement): NodeListOf<HTMLTableCellElement> => row.querySelectorAll('td');

  /**
   * Get unEffected search rows.
   * @return { NodeListOf<HTMLTableRowElement> }
   */
  const getUnEffectedSearchRows = (): NodeListOf<HTMLTableRowElement> => {
    return table.current?.querySelectorAll(`tbody tr:not([${searchAttribute}])`) as NodeListOf<HTMLTableRowElement>;
  }

  /**
   * *****************************************************************
   * Tab Limit Area
   * *****************************************************************
   */

  /**
   * Get table tabs length.
   * @return { number }
   */
  const getTabsLength = (): number => {
    const unEffectedRows = getUnEffectedSearchRows()?.length;
    const limit = tableLimit > 0 ? tableLimit : 1000;
    return unEffectedRows ? Math.ceil(unEffectedRows / limit) : 1;
  };

  /**
   * Remove tab attribute from all table rows.
   * @return { void }
   */
  const removeRowsTabAttribute = (): void => {
    const rows = getTableRows();
    rows.forEach((row: HTMLTableRowElement) => {
      row.removeAttribute(tabAttribute);
    });
  }

  /**
   * Add tab attribute for all table rows.
   * @return { void }
   */
  const setRowsTabAttribute = (): void => {
    getTableRows().forEach((row: HTMLTableRowElement) => {
      row.setAttribute(tabAttribute, '');
    });
  }

  /**
   * Remove row tab attribute.
   * @param { HTMLTableRowElement } row
   * @return { void }
   */
  const removeRowTabAttribute = (row: HTMLTableRowElement): void => {
    row?.removeAttribute(tabAttribute);
  }

  /**
   * Get end of display records.
   * @return { number }
   */
  const getEndOfDisplayRecords = (): number => Math.ceil(currentTab * tableLimit);

  /**
   * Get start of display records.
   * @return { number }
   */
  const getStartOfDisplayRecords = (): number => Math.ceil(getEndOfDisplayRecords() - tableLimit);

  /**
   * Set tab limit.
   * @return { void }
   */
  const setTabLimit = (): void => {
    const rows = getUnEffectedSearchRows();
    setRowsTabAttribute();
    for (let i = getStartOfDisplayRecords(); i < getEndOfDisplayRecords(); i++) {
      removeRowTabAttribute(rows[i]);
    }
  }

  /**
   * To next tab.
   * @return { void }
   */
  const toNextTab = (): void => {
    setCurrentTab((prev: number) => {
      if (prev < getTabsLength()) {
        return prev + 1;
      }
      return prev;
    });
  }

  /**
   * to prev tab.
   * @return { void }
   */
  const toPrevTab = (): void => {
    setCurrentTab((prev: number) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  }

  /**
   * Reset current tab.
   * @return { void }
   */
  const resetCurrentTab = (): void => {
    setCurrentTab((_prev: number) => 1);
  }

  /**
   * *****************************************************************
   * Search Area
   * *****************************************************************
   */

  /**
   * Remove search attribute from all table rows.
   * @return { void }
   */
  const removeRowsSearchAttribute = (): void => {
    const rows = getTableRows();
    rows.forEach((row: HTMLTableRowElement) => {
      row.removeAttribute(searchAttribute);
    });
  }

  /**
   * Set search attribute to a row.
   * @param { HTMLTableRowElement } row
   * @return { void }
   */
  const setRowSearchAttribute = (row: HTMLTableRowElement): void => {
    row.setAttribute(searchAttribute, "");
  }

  /**
   * Search in table.
   * @param { string } needle
   * @return { void }
   */
  const tableSearch = (needle: string = ""): void => {
    const rows = getTableRows();


    // Clear all effect attributes.
    removeRowsTabAttribute();
    removeRowsSearchAttribute();
    resetCurrentTab();

    // Loop in table rows.
    rows.forEach((row: HTMLTableRowElement) => {
      var isFound: boolean = false;
      const cells = getRowCells(row);

      // Search inside row cells
      cells.forEach((cell: HTMLTableCellElement) => {
        const searchQuery = cell.textContent?.toUpperCase().search(needle.toUpperCase());

        if (searchQuery !== undefined && searchQuery >= 0) {
          isFound = true;
        }
      });

      // check if needle is found or not.
      if (!isFound) {
        setRowSearchAttribute(row);
      }
    });
    setTabLimit();
  }


  return {
    currentTab,
    setTableLimit,
    tableSearch,
    setTabLimit,
    toNextTab,
    toPrevTab,
    tableLimit,
    resetCurrentTab,
    getTabsLength
  }
}


export default useTable;
