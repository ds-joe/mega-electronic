// Dependencies
import { FC } from "react";

// Components
import { Nav } from "react-bootstrap";
import { Link } from "@inertiajs/react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Hooks
import useRoute from "@/hooks/useRoute";

// Routes
import dashboardRoutes from "@/routes/dashboard";

const SidebarBody: FC = () => {
  const words = useSelector((state: RootState) => state.layout.layoutsWords.dashboard);
  const { isUsed, categoriesContainer } = useRoute();
  return (
    <Nav className="pf-sidebar-body">

      {
        categoriesContainer(dashboardRoutes(words)).map((container, key: number) => (
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
