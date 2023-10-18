// Dependencies
import { FC } from "react";

// Components
import { Image, Nav } from "react-bootstrap";
import { Link } from "@inertiajs/react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Assets
import logo from "~/images/logo/logo-dark-full.png";

const Navbar: FC = () => {
  const layoutWords = useSelector((state: RootState) => state.global.layout.layoutsWords.auth);

  return (
    <Nav className="auth-navbar">
      <Nav.Item className="left-side">
        <Image className="app-logo" src={logo} alt="logo" />
      </Nav.Item>
      <Nav.Item className="right-side">
        <Link className="nav-link" href={"/"}>
          <i className="fas fa-shopping-cart" />
          {layoutWords.store}
        </Link>
        <Link className="nav-link" href={route('auth.register')}>
          <i className="fas fa-user-circle" />
          {layoutWords.sign_up}
        </Link>
        <Link className="nav-link" href={route('auth.login')}>
          <i className="fas fa-key" />
          {layoutWords.sign_in}
        </Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navbar;
