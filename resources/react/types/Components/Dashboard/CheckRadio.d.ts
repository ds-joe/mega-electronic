import { ChangeEvent } from "react";

export type CheckRadioProps = {
  type: "switch" | "checkbox" | "radio",
  label?: string,
  name?: string,
  id?: string,
  className?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
