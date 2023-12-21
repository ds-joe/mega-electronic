// Dependencies
import { FC } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleFold } from "@/redux/slicers/components/sidebar";

// Types
import { RootState } from "@/redux/store";

// Assets
import logoLight from "~/images/logo/logo-light-full.png";
import logoDark from "~/images/logo/logo-dark-full.png";
import { Image } from "react-bootstrap";

const SidebarHeader: FC = () => {
  const dispatch = useDispatch();
  const { isFold } = useSelector((state: RootState) => state.sidebar);
  const settings = useSelector((state: RootState) => state.layout.settings);


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
