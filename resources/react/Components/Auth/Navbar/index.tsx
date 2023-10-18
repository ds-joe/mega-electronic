// Dependencies
import { FC } from "react";

// Components
import { Image, Nav } from "react-bootstrap";
import { Link } from "@inertiajs/react";

// Assets
import logo from "~/images/logo/logo-dark-full.png";

const Navbar: FC = () => {
  return (
    <Nav className="auth-navbar">
      <Nav.Item className="left-side">
        <Image className="app-logo" src={logo} alt="logo" />
      </Nav.Item>
      <Nav.Item className="right-side">
        <Link className="nav-link" href={"/auth/login"}>
          <i className="fas fa-shopping-cart" />
          store
        </Link>
        <Link className="nav-link" href="/auth/register">
          <i className="fas fa-user-circle" />
          Sign up
        </Link>
        <Link className="nav-link" href="/">
          <i className="fas fa-key" />
          Sign in
        </Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navbar;
