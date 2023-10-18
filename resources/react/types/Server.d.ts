import { Errors, ErrorBag, PageProps } from "@inertiajs/core";

// Words
export type ServerLayoutWords = Record<string, string>;
export interface ServerLayoutsWords {
  auth: ServerLayoutWords;
}
export interface ServerPageWords {
  pageWords: Record<string, string>;
}

// Auth
export interface ServerAuth {
  user: User | null
}

export interface ServerProps extends PageProps {
  layoutsWords: ServerLayoutsWords;
  auth: ServerAuth,
  errors: Errors & ErrorBag;
}
