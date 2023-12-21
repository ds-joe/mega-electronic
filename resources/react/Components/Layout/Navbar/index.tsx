// Dependencies
import { FC } from "react";

// Components
import UserDropdown from "./Components/UserDropdown";
import { Container } from "react-bootstrap";
import ControlButtons from "./Components/ControlButtons";

const Navbar: FC = () => {
  return (
    <nav className="pf-navbar">
      <Container fluid className="pf-navbar-container">
        <UserDropdown />
        <ControlButtons />
      </Container>
    </nav>
  )
}

export default Navbar;
