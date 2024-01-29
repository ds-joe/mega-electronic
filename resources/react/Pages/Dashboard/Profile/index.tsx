
// Components
import Dashboard from "@/Layout/Dashboard";
import Header from "@/Components/Layout/Header";
import { Row, Col } from "react-bootstrap";
import HeaderCard from "./components/HeaderCard";

// Hooks
import { usePage } from "@inertiajs/react";

// Types
import { ProfileProps } from "@/types/Pages/Profile";
import ImagesButtons from "./components/ImagesButtons";
import ChangePasswordArea from "./components/ChangePasswordArea";
import DetailsArea from "./components/DetailsArea";

const Profile: RP = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<ProfileProps>;
  const { user_data } = pageData;

  return (
    <Dashboard pageTitle={pageWords?.profile} >
      <main className="pf-profile-page">
        <Row className="gap-7">
          <Col xs='12'>
            <Header title={pageWords?.profile} />
          </Col>
          <Col xs='12'>
            <HeaderCard data={user_data} />
          </Col>
          <Col xs='12'>
            <Row className="gap-7 lg:gap-0">
              <Col xs='12' lg="5">
                <ImagesButtons />
              </Col>
              <Col xs='12' lg="7">
                <ChangePasswordArea />
              </Col>
            </Row>
          </Col>
          <Col xs='12'>
            <DetailsArea user={user_data} />
          </Col>
        </Row>
      </main>
    </Dashboard>
  )
}

export default Profile;
