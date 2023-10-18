import { SidebarSlicerState } from "../types/sidebar";

export const sidebarActions = {
  toggleOpen: (state: SidebarSlicerState) => {
    state.isOpen = !state.isOpen;
  }
}
