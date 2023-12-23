// Components
import { FormGroup, FormControl, Button } from "react-bootstrap";

// Hooks
import { usePage } from "@inertiajs/react";

// Types
import { FilterProductsContainerProps } from "@/types/Components/Containers/FilterProductsContainer";
import { ChangeEvent } from "react";

const FilterProductsContainer: RC<FilterProductsContainerProps> = ({ children, attributes, searchPlaceholder, recordsByStep, setRecordsByStep, toNextStep, toPrevStep, tableSearch, currentStep, available_steps }) => {
  const { layoutsWords } = usePage().props as ServerProps;

  const search = (e: ChangeEvent<HTMLInputElement>) => tableSearch(e.target.value);
  const limit = (e: ChangeEvent<HTMLInputElement>) => setRecordsByStep(Number(e.target.value));

  return (
    <section>
      <FormGroup className="flex items-center gap-2">
        <FormControl
          onChange={search}
          placeholder={searchPlaceholder}
        />
        <FormControl
          step={1}
          type="number"
          min={1}
          max={1000}
          value={recordsByStep}
          onChange={limit}
          placeholder={layoutsWords?.limit}
          className="fit"
        />
      </FormGroup>
      <FormGroup className="flex items-center justify-end gap-2 mt-2 mb-4">
        <Button size="sm" className="btn-icon" onClick={toPrevStep} disabled={currentStep <= 1}>
          <i className="fas fa-angle-up" />
          <span>{layoutsWords?.previous}</span>
        </Button>
        <Button size="sm" className="btn-icon" onClick={toNextStep} disabled={currentStep === available_steps}>
          <i className="fas fa-angle-down" />
          <span>{layoutsWords?.next}</span>
        </Button>
      </FormGroup>
      <div {...attributes}>
        {children}
      </div>
    </section>
  )
}

export default FilterProductsContainer;
