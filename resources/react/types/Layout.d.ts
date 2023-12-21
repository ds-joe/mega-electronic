import { ServerLayoutWords } from "./Server";

export interface LayoutSettings {
  language: "en" | "ar";
  dark_mode: boolean;
  direction: "rtl" | "ltr";
}

export interface DashboardLayoutProps {
  pageWords: ServerLayoutWords,
  url: string,
  settings: LayoutSettings
}
