import { ReactNode, FC } from "react";

declare global {
  type RC<P = {}> = FC<P>;
  type RP<P = {}> = FC<P>;
}

export interface AppProps {
  children: ReactNode
}

