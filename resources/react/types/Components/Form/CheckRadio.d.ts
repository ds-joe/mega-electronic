import { ChangeEvent, ReactNode } from "react";

export type CheckRadioProps =
  {
    type: "switch" | "checkbox",
    className?: string,
    label?: ReactNode,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    id?: string,
    name?: string,
    checked?: boolean
  }
