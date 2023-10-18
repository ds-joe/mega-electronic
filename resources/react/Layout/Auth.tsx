// Dependencies
import { FC } from "react";

// Components
import { Container } from "react-bootstrap";
import Head from "@/Components/Global/Head";
import Navbar from "@/Components/Auth/Navbar";
import Footer from "@/Components/Dashboard/Footer";

// Types
import { LayoutProps } from "@/types/Layouts/Layout";

const AuthLayout: FC<LayoutProps> = ({ pageTitle, children }) => {
  return (
    <main className="AUTH-LAYOUT">
      <Head title={`Auth - ${pageTitle}`}></Head>
      <section className="auth-section">
        <Container className="auth-container">
          <Navbar />
          <div className="auth-content">
            {children}
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  )
}

export default AuthLayout;
