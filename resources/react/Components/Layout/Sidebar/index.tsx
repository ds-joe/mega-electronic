// Redux
import { useSelector } from "react-redux";

// Components
import SidebarHeader from "./Components/Header";
import SidebarBody from "./Components/Body";

// Types
import { RootState } from "@/redux/store";

const Sidebar: RC = () => {
  const { isOpen, isFold } = useSelector((state: RootState) => state.sidebar);

  return (
    <aside className={`pf-sidebar ${isFold && "pf-sidebar-fold"} ${isOpen && "pf-sidebar-open"}`}>
      <SidebarHeader />
      <SidebarBody />
    </aside>
  )
}

export default Sidebar;
