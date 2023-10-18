import { ReactNode } from "react";
import { ServerProps } from "./Server";

export interface AppProps {
  children: ReactNode,
  props: ServerProps
}
