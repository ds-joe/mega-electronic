// Dependencies
import { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";

// Types
import { UseTableData, UseTableProps } from "@/types/Hooks/useTable";

const useTable = ({ routeName, available_steps = 1, allowed_sort_columns }: UseTableProps) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<UseTableData['currentStep']>(1);
  const [recordsByStep, setRecordsByStep] = useState<UseTableData['recordsByStep']>(50);
  const [sortBy, setSortBy] = useState<UseTableData['sortBy']>("id");
  const [reverse, setReverse] = useState<UseTableData['reverse']>(true);
  const [searchQuery, setSearchQuery] = useState<UseTableData['searchQuery']>("");
  const { patch } = useForm();
  var searchTimer: any;  // @ts-ignore
  const runData = useMemo(() => {
    firstLoad && patch(route(routeName, {
      currentStep,
      recordsByStep,
      reverse: reverse ? 1 : 0,
      searchQuery,
      sortBy,
    }));
    !firstLoad && setFirstLoad(true);
  }, [currentStep, searchQuery, reverse, recordsByStep, sortBy]);
  // @ts-ignore
  const resetSteps = useMemo(() => {
    firstLoad && setCurrentStep(1);
  }, [recordsByStep]);


  /**
   * To next step
   * @return { void }
   */
  const toNextStep = (): void => setCurrentStep((prev) => (prev + 1) <= available_steps ? (prev + 1) : prev);

  /**
   * To previous step
   * @return { void }
   */
  const toPrevStep = (): void => setCurrentStep((prev) => prev - 1 >= 1 ? (prev - 1) : prev);

  /**
   * Toggle reverse table/
   * @return { void }
   */
  const toggleReverseTable = (): void => setReverse((prev) => !prev);

  /**
   * Set Table Search
   * @param { UseTableData['searchQuery'] } e
   * @return { void }
   */
  const tableSearch = (e: UseTableData['searchQuery']): void => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setSearchQuery(e);
    }, 500);
  }

  return {
    toNextStep,
    toPrevStep,
    toggleReverseTable,
    setSortBy,
    setRecordsByStep,
    tableSearch,
    currentStep,
    recordsByStep,
    available_steps,
    allowed_sort_columns
  };
}

export default useTable;
