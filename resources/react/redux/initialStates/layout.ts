// Types
import { LayoutSlicerState } from "../types/layout";

export const initialState: LayoutSlicerState = {
  layoutsWords: {
    auth: {},
    dashboard: {}
  },
  url: "/",
  settings: {
    language: "en",
    dark_mode: false,
    direction: "rtl"
  }
}
