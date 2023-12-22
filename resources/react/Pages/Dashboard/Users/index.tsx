import Dashboard from "@/Layout/Dashboard";

// Components
import { Row, Col } from "react-bootstrap";
import Header from "@/Components/Layout/Header";
import StatusCards from "./components/StatusCards";
import UsersTable from "./components/UsersTable";
import CreateUserModal from "./components/CreateUserModal";

// Hooks
import { usePage } from "@inertiajs/react";

// Types
import UpdateUserModal from "./components/UpdateUserModal";

const Users: RP = () => {
  const { pageWords } = usePage().props as ServerProps;
  return (
    <Dashboard pageTitle={pageWords?.users} >
      <CreateUserModal />
      <UpdateUserModal />
      <Row className="gap-7">
        <Col xs="12">
          <Header title={pageWords?.users} />
        </Col>
        <Col xs="12" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatusCards />
        </Col>
        <Col xs='12'>
          <UsersTable />
        </Col>
      </Row>
    </Dashboard>
  )
}

export default Users;
