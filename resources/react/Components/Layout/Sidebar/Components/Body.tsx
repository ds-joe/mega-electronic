// Dependencies
import { FC } from "react";

// Components
import { Nav } from "react-bootstrap";
import { Link } from "@inertiajs/react";

// Hooks
import useRoute from "@/hooks/useRoute";
import { usePage } from "@inertiajs/react";

// Routes
import dashboardRoutes from "@/routes/dashboard";

const SidebarBody: FC = () => {
  const { layoutsWords } = usePage().props as ServerProps;
  const { isUsed, categoriesContainer } = useRoute();

  return (
    <Nav className="pf-sidebar-body">

      {
        categoriesContainer(dashboardRoutes(layoutsWords)).map((container, key: number) => (
          <span key={key}>
            <h3 className={"pf-sidebar-label"}>{container.category}</h3>
            {
              container.routes.map((route: Route) => (
                <Link href={route.url} className={`nav-item ${isUsed(route) && "active"}`} key={route.url}>
                  <i className={route.icon} />
                  <span className="nav-item-content">{route.name}</span>
                </Link>
              ))
            }
          </span>
        ))
      }
    </Nav>
  )
}

export default SidebarBody;
