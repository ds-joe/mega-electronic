import { LayoutSettings } from "@/types/Layout"
import { ServerLayoutsWords } from "@/types/Server"

export type LayoutSlicerState = {
  layoutsWords: ServerLayoutsWords,
  url: string,
  settings: LayoutSettings
}
