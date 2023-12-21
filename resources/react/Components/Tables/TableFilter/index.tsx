// Dependencies
import { ChangeEvent, FC, useEffect } from "react";

// Components
import { FormControl, Button } from "react-bootstrap";

// Types
import { TableFilterProps } from "@/types/Components/Tables/TableFilter";

const TableFilter: FC<TableFilterProps> = ({ setTabLimit, setTableLimit, tableSearch, currentTab, toNextTab, toPrevTab, tableLimit, searchPlaceholder, resetCurrentTab, getTabsLength }) => {

  useEffect(() => {
    setTabLimit();
  }, [currentTab, tableLimit]);

  useEffect(() => {
    resetCurrentTab();
  }, [tableLimit]);

  const search = (e: ChangeEvent<HTMLInputElement>) => tableSearch(e.target.value);
  const limit = (e: ChangeEvent<HTMLInputElement>) => setTableLimit(Number(e.target.value));

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <FormControl
          onChange={search}
          placeholder={searchPlaceholder}
        />
        <FormControl
          onChange={limit}
          type="number"
          step={1}
          min={1}
          max={1000}
          value={tableLimit}
          className="fit"
        />
      </div>
      <div className="flex justify-end flex-wrap items-center gap-2">
        <Button className="btn-sm" onClick={toNextTab}>
          <i className="fas fa-angle-left" />
        </Button>
        <p className="px-3 py-1 rounded bg-primary text-white">
          <span className="text-warning">{getTabsLength()}</span> ~ {currentTab}
        </p>
        <Button className="btn-sm" onClick={toPrevTab}>
          <i className="fas fa-angle-right" />
        </Button>
      </div>
    </div>
  )
}

export default TableFilter;
