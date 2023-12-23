// Types
import { ServerWords } from "@/types/Server";

const dashboardRoutes: RoutesFun = (words: ServerWords): Routes => {
  const DASHBOARD_BASE = "/dashboard";

  return [
    {
      'name': words?.home,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}`,
      "icon": "far fa-house",
    },
    {
      name: words?.sales,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/sales`,
      icon: "far fa-chart-line-up"
    },
    {
      name: words?.expenses,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/expenses`,
      icon: "far fa-chart-pie"
    },
    {
      name: words?.tickets,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/tickets`,
      icon: "far fa-ticket"
    },
    {
      name: words?.orders,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/orders`,
      icon: "far fa-car-wash"
    },
    {
      name: words?.customers,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/customers`,
      icon: "far fa-users"
    },
    {
      name: words?.users,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/users`,
      icon: "far fa-user"
    },
    {
      name: words?.products,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/products`,
      icon: "far fa-box"
    },
    {
      'name': words?.tasks,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}/tasks`,
      "icon": "far fa-file-check",
    },
  ]
}

export default dashboardRoutes;
