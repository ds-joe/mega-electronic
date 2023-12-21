import { ReactNode, FC } from "react";
import { ServerPageProps, PageWords, ServerProps } from "./Server";

export interface AppProps {
  children: ReactNode,
  props: ServerProps
}

export type FCPage<P = {}> = FC<ServerPageProps & P>;
export type FCComponent<P = {}> = FC<PageWords & P>;
