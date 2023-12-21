import { ReactNode } from "react";
import { TypeOptions } from "react-toastify";

export interface ServerNotification {
  type: TypeOptions,
  message: ReactNode
}
