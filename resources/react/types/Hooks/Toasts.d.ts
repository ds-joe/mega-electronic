import { ReactNode } from "react";

export interface ConfirmationToastProps {
  onClose: () => void,
  onConfirm: () => void,
  children: ReactNode
}
