import { SalesSlicerState } from "@/redux/types/pages/sales"

export const salesActions = {
  toggleCreateSaleModal: (state: SalesSlicerState) => {
    state.createSaleModalDisplay = !state.createSaleModalDisplay;
  }
}

