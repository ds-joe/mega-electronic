// Dependencies
import { ChangeEvent } from "react";

// Components
import { FormControl, Button, FormSelect } from "react-bootstrap";

// Hooks
import { usePage } from "@inertiajs/react";

// Types
import { TableFilterProps } from "@/types/Components/Tables/TableFilter";

const TableFilter: RC<TableFilterProps> = ({ allowed_sort_columns, searchPlaceholder, tableSearch, toNextStep, recordsByStep, currentStep, toPrevStep, setRecordsByStep, toggleReverseTable, setSortBy }) => {
  const { pageWords } = usePage().props as ServerProps;
  const search = (e: ChangeEvent<HTMLInputElement>) => tableSearch(e.target.value);
  const limit = (e: ChangeEvent<HTMLInputElement>) => setRecordsByStep(Number(e.target.value));

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
          size="sm"
          value={recordsByStep}
          className="fit"
        />
        <FormSelect className="fit" size="sm" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}>
          {
            allowed_sort_columns?.map((column: string) => (
              <option key={column} value={column}>{pageWords[`${column}`] ? pageWords[`${column}`] : ""}</option>
            ))
          }
        </FormSelect>
      </div>
      <div className="flex justify-end flex-wrap items-center gap-2">
        <Button className="btn-sm" onClick={toNextStep}>
          <i className="fas fa-angle-left" />
        </Button>
        <p className="flex items-center justify-center px-3 py-1 rounded border border-primary dark:text-white">{currentStep}</p>
        <Button className="btn-sm" onClick={toPrevStep}>
          <i className="fas fa-angle-right" />
        </Button>
        <Button variant="primary" className="btn-sm" onClick={toggleReverseTable}>
          <i className="fas fa-up-down" />
        </Button>
      </div>
    </div>
  )
}

export default TableFilter;
