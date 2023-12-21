// Dependencies
import { FC } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleOpen as toggleSidebar } from "@/redux/slicers/components/sidebar";
import { toggleOpen as toggleCart } from "@/redux/slicers/components/cart";

// Components
import { FormGroup } from "react-bootstrap";

// Hooks
import { Link } from "@inertiajs/react";


const ControlButtons: FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.layout.settings);

  // Handle Open Sidebar
  const toggleOpenSidebar = () => {
    dispatch(toggleSidebar());
  }

  // Handle open cart.
  const toggleCartOpen = () => {
    dispatch(toggleCart());
  }

  return (
    <div className="pf-navbar-control-buttons">
      <div className="pf-navbar-settings-area">
        <FormGroup className="setting-block">
          <Link method={"post"} onSuccess={() => location.reload()} href={route('user.settings.toggle.dark_mode')} className={`setting-label-icon fal fa-${settings.dark_mode ? 'sun' : 'moon'}`} as="button"></Link>
        </FormGroup>
        <FormGroup className="setting-block">
          <Link method={"post"} onSuccess={() => location.reload()} href={route('user.settings.toggle.direction')} className="setting-label-icon fal fa-book" as="button"></Link>
        </FormGroup>
        <FormGroup className="setting-block">
          <i className="setting-label-icon fal fa-shopping-cart" onClick={toggleCartOpen} />
        </FormGroup>
      </div>
      <i className="far fa-bars pf-navbar-sidebar-toggle-button" onClick={toggleOpenSidebar} />
    </div>
  )
}

export default ControlButtons;
