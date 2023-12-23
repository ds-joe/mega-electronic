import { SalesSlicerState } from "@/redux/types/pages/sales"

export const salesActions = {
  toggleCreateSaleModal: (state: SalesSlicerState) => {
    state.createSaleModalDisplay = !state.createSaleModalDisplay;
  },
  toggleUpdateSaleModal: (state: SalesSlicerState) => {
    state.updateSaleModalDisplay = !state.updateSaleModalDisplay;
  },
}

