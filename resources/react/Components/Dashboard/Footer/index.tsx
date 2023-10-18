// Dependencies
import { FC } from "react";

// Components
import { Container } from "react-bootstrap";

const Footer: FC = () => {
  return (
    <footer className="footer">
      <Container>
        Copyright © 2023 <a className="font-semibold text-dash-blue" href="https://www.facebook.com/YoussefBibawy1/" target="_blank">{import.meta.env.VITE_APP_NAME || "Joe"}</a> All rights reserved.
      </Container>
    </footer>
  )
}

export default Footer;
