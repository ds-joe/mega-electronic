import { Errors, ErrorBag } from "@inertiajs/core";
import { AuthProps } from "./Auth";
import { DashboardLayoutProps } from "./Layout";
import { ServerNotification } from "./Notification";
import { SeverPaths } from "./Paths";


// Words
export type ServerLayoutWords = Record<string, string>;

export interface ServerLayoutsWords {
  auth: ServerLayoutWords;
  dashboard: ServerLayoutWords;
}

export interface PageWords {
  pageWords: Record<string, string>;
}

// Settings
export interface ServerProps extends DashboardLayoutProps {
  layoutsWords: ServerLayoutsWords;
  auth: AuthProps;
  errors: Errors & ErrorBag;
  notification: ServerNotification | null,
  paths: SeverPaths
}

export interface ServerPageProps extends ServerProps, PageWords { }
