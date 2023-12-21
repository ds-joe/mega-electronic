// Dependencies
import { FCPage } from "@/types/App";
import Dashboard from "@/Layout/Dashboard";

// Components
import { Row, Col } from "react-bootstrap";
import Header from "@/Components/Layout/Header";
import StatesCards from "./components/StatesCards";
import UsersTable from "./components/UsersTable";
import CreateUserModal from "./components/CreateUserModal";

// Types
import { UsersProps } from "@/types/Pages/Users";
import UpdateUserModal from "./components/UpdateUserModal";

const Users: FCPage<UsersProps> = ({ pageWords, notification, users, total_active_users, total_disabled_users, total_users }) => {
  return (
    <Dashboard pageTitle={pageWords?.users} notification={notification}>
      <CreateUserModal pageWords={pageWords} />
      <UpdateUserModal pageWords={pageWords} />
      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.users} />
        </Col>
        <Col xs="12" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatesCards pageWords={pageWords} total_active_users={total_active_users} total_users={total_users} total_disabled_users={total_disabled_users} />
        </Col>
        <Col xs='12'>
          <UsersTable pageWords={pageWords} users={users} />
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Users;
