// Types
import { ServerLayoutWords } from "@/types/Server";

const dashboardRoutes: RoutesFun = (words: ServerLayoutWords): Routes => {
  const DASHBOARD_BASE = "/dashboard";

  return [
    {
      'name': words?.home,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}`,
      "icon": "far fa-rocket",
    },
    {
      name: words?.sales,
      category: "money",
      permissions: [],
      url: `${DASHBOARD_BASE}/sales`,
      icon: "far fa-chart-line-up"
    },
    {
      name: words?.expenses,
      category: "money",
      permissions: [],
      url: `${DASHBOARD_BASE}/expenses`,
      icon: "far fa-chart-pie"
    },
    {
      name: words?.tickets,
      category: "money",
      permissions: [],
      url: `${DASHBOARD_BASE}/tickets`,
      icon: "far fa-ticket"
    },
    {
      name: words?.orders,
      category: "money",
      permissions: [],
      url: `${DASHBOARD_BASE}/orders`,
      icon: "far fa-car-wash"
    },
    {
      name: words?.customers,
      category: "services",
      permissions: [],
      url: `${DASHBOARD_BASE}/customers`,
      icon: "far fa-users"
    },
    {
      name: words?.users,
      category: "services",
      permissions: [],
      url: `${DASHBOARD_BASE}/users`,
      icon: "far fa-user"
    },
    {
      name: words?.products,
      category: "services",
      permissions: [],
      url: `${DASHBOARD_BASE}/products`,
      icon: "far fa-gifts"
    },
    {
      'name': words?.tasks,
      'category': "services",
      "permissions": [],
      "url": `${DASHBOARD_BASE}/tasks`,
      "icon": "far fa-file-check",
    },
  ]
}

export default dashboardRoutes;
