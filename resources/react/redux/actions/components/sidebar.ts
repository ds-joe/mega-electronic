import { SidebarSlicerState } from "../../types/components/sidebar";

export const sidebarActions = {
  toggleOpen: (state: SidebarSlicerState) => {
    state.isOpen = !state.isOpen;
  },
  toggleFold: (state: SidebarSlicerState) => {
    state.isFold = !state.isFold;
  }
}
