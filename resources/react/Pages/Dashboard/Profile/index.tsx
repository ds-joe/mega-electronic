// Dependencies
import { FCPage } from "@/types/App";

// Components
import Dashboard from "@/Layout/Dashboard";
import Header from "@/Components/Layout/Header";
import { Row, Col } from "react-bootstrap";
import HeaderCard from "./components/HeaderCard";

// Types
import { ProfileProps } from "@/types/Pages/Profile";
import ImagesButtons from "./components/ImagesButtons";
import ChangePasswordArea from "./components/ChangePasswordArea";
import DetailsArea from "./components/DetailsArea";

const Profile: FCPage<ProfileProps> = ({ pageWords, user_data, notification }) => {
  return (
    <Dashboard pageTitle={pageWords?.profile} notification={notification}>
      <main className="pf-profile-page">
        <Row className="gap-7">
          <Col xs='12'>
            <Header title={pageWords?.profile} />
          </Col>
          <Col xs='12'>
            <HeaderCard data={user_data} pageWords={pageWords} />
          </Col>
          <Col xs='12'>
            <Row className="gap-7 lg:gap-0">
              <Col xs='12' lg="5">
                <ImagesButtons pageWords={pageWords} />
              </Col>
              <Col xs='12' lg="7">
                <ChangePasswordArea pageWords={pageWords} />
              </Col>
            </Row>
          </Col>
          <Col xs='12'>
            <DetailsArea pageWords={pageWords} user={user_data} />
          </Col>
        </Row>
      </main>
    </Dashboard>
  )
}

export default Profile;
