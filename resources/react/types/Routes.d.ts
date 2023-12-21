import { ServerLayoutWords } from "./Server";

declare global {
  interface Route {
    name?: string,
    url: string,
    icon?: `far fa-${string}`,
    hidden?: boolean,
    category: string,
    permissions: Array<string> // the permissions can access to this route.
  }
  type Routes = Array<Route>;
  type RoutesFun = (words: ServerLayoutWords) => Routes;
}



