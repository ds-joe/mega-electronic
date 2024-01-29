// Types
import { ServerWords } from "@/types/Server";

const dashboardRoutes: RoutesFun = (words: ServerWords): Routes => {
  const DASHBOARD_BASE = "";

  return [
    {
      'name': words?.dashboard,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}/`,
      "icon": "far fa-robot",
      available: true,
    },
    {
      name: words?.sales,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/sales`,
      icon: "far fa-shop",
      available: true,
    },
    {
      name: words?.products,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/products`,
      icon: "far fa-box",
      available: true,
    },
    {
      name: words?.customers,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/customers`,
      icon: "far fa-users",
      available: true,
    },
    {
      name: words?.users,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/users`,
      icon: "far fa-user",
      available: true,
    },
    {
      'name': words?.profile,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}/profile`,
      "icon": "far fa-address-card",
      available: true,
    },
    {
      name: words?.expenses,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/expenses`,
      icon: "far fa-chart-pie",
      available: true,
    },
    {
      name: words?.tickets,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/tickets`,
      icon: "far fa-ticket",
      available: false,
    },
    {
      name: words?.orders,
      category: "dashboard",
      permissions: [],
      url: `${DASHBOARD_BASE}/orders`,
      icon: "far fa-car-wash",
      available: false,
    },
    {
      'name': words?.tasks,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}/tasks`,
      "icon": "far fa-file-check",
      available: false,
    },
    {
      'name': words?.settings,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}/settings`,
      "icon": "far fa-cog",
      available: false,
    },
    {
      'name': words?.permissions,
      'category': "dashboard",
      "permissions": [],
      "url": `${DASHBOARD_BASE}/permissions`,
      "icon": "far fa-badge-check",
      available: false,
    },
  ]
}

export default dashboardRoutes;
