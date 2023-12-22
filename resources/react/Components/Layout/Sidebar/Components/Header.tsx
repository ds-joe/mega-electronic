// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleFold } from "@/redux/slicers/components/sidebar";

// Types
import { RootState } from "@/redux/store";

// Hooks
import { usePage } from "@inertiajs/react";

// Assets
import logoLight from "~/images/logo/logo-light-full.png";
import logoDark from "~/images/logo/logo-dark-full.png";
import { Image } from "react-bootstrap";

const SidebarHeader: RC = () => {
  const { settings } = usePage().props as ServerProps;
  const dispatch = useDispatch();
  const { isFold } = useSelector((state: RootState) => state.sidebar);


  // Handle Fold Sidebar
  const handleFold = () => {
    dispatch(toggleFold());
  }

  return (
    <div className="pf-sidebar-header">
      <Image className={'pf-sidebar-logo'} width={120} src={settings.dark_mode ? logoDark : logoLight} alt={""} />
      <i
        className={`far fa-${isFold ? 'xmark' : "bars"} pf-sidebar-fold-button`}
        onClick={handleFold} />
    </div>
  )
}

export default SidebarHeader;
