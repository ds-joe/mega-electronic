import { Errors, ErrorBag, PageProps } from "@inertiajs/core";
import { AuthProps } from "./Auth";
import { DashboardLayoutProps } from "./Layout";
import { ServerNotification } from "./Notification";
import { SeverPaths } from "./Paths";


type ServerWords = Record<string, string>;
declare global {
  interface ServerProps<P = Record<string, string>> extends DashboardLayoutProps, PageProps {
    layoutsWords: ServerWords;
    auth: AuthProps;
    errors: Errors & ErrorBag;
    notification: ServerNotification | null,
    paths: SeverPaths,
    pageWords: ServerWords,
    pageData: P
  }
}

