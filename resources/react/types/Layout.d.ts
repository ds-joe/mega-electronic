import { ServerWords } from "./Server";

export interface LayoutSettings {
  language: "en" | "ar";
  dark_mode: boolean;
  direction: "rtl" | "ltr";
}

export interface DashboardLayoutProps {
  pageWords: ServerWords,
  url: string,
  settings: LayoutSettings
}
