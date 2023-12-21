// Types
import { AuthProps } from "@/types/Auth";

/**
 * @desc This hook using to control routes.
 */
const useRoute = () => {

  /**
   * @desc This function using to get the routes categories.
   * @param { Routes } routes
   * @return { Array<string> }
   */
  const getRoutesCategories = (routes: Routes): Array<string> => {
    const categories: Array<string> = [];
    routes.map((route: Route) => !categories.includes(route.category.toLocaleUpperCase()) && categories.push(route.category.toLocaleUpperCase()))
    return categories;
  }

  /**
   * @desc This function using to check if this route is already used.
   * @param { Route } route
   * @return { boolean }
   */
  const isUsed = (route: Route): boolean => {
    return route.url === location.pathname;
  }

  /**
   * @desc This function using to put every route in they category container.
   * @param routes
   * @return { Record<string, Routes>}
   */
  const categoriesContainer = (routes: Routes) => {
    const categories = getRoutesCategories(routes);
    let containers: Array<{
      category: string,
      routes: Routes
    }> = [];
    categories.map((category: string) => containers.push({
      category,
      routes: []
    }));
    containers.map((container) => {
      routes.map((route: Route) => {
        container.category === route.category.toLocaleUpperCase() && container.routes.push(route)
      })
    })
    return containers;
  }

  /**
   * @desc This function using to check if this user has access to this route.
   * @param { AuthProps } auth
   * @param { Route } route
   * @returns
   */
  const hasAccess = (auth: AuthProps, route: Route): boolean => {
    return route.permissions.some((permission: string) => auth.permissions.includes(permission));
  }

  return {
    getRoutesCategories,
    isUsed,
    categoriesContainer,
    hasAccess
  }
}

export default useRoute;
