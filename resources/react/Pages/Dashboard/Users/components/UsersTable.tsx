
// Redux
import { useDispatch } from "react-redux";
import { toggleCreateUserModalDisplay, toggleUpdateUserModalDisplay, setUpdatingUser } from "@/redux/slicers/pages/users";

// Components
import { Dropdown, Card, Table, Image } from "react-bootstrap";
import TableFilter from "@/Components/Tables/TableFilter";

// Hooks
import useTable from "@/hooks/useTable";
import { useForm, usePage } from "@inertiajs/react";
import useToast from "@/hooks/useToast";

// Types
import { UsersProps } from "@/types/Pages/Users";
import { User } from "@/types/Models/User";

// Assets
import avatar from "~/images/auth/userAvatar.svg";

const UsersTable: RC = () => {
  const { pageWords, paths, pageData } = usePage().props as ServerProps<UsersProps>;
  const { allowed_sort_columns, available_steps, data } = pageData.users_table;
  const tableHook = useTable({ routeName: "users.table", allowed_sort_columns, available_steps });
  const { images_paths } = paths;
  const dispatch = useDispatch();
  const { patch } = useForm();
  const { confirmationToast } = useToast();

  // handle toggle open update modal
  const handelOpenUpdateModal = (user: User) => {
    dispatch(setUpdatingUser(user));
    dispatch(toggleUpdateUserModalDisplay());
  }

  // handle toggle open create modal
  const handleOpenCreateModal = () => {
    dispatch(toggleCreateUserModalDisplay());
  }

  // handle delete user
  const handleDeleteUser = (id: number) => {
    confirmationToast(pageWords?.do_you_want_delete_this_user, () => {
      patch(route('users.delete', {
        id
      }));
    });
  }

  return (
    <Card >
      <Card.Body>
        <Card.Title>{pageWords?.users_table}</Card.Title>
        <div className="mt-1 flex items-center justify-between gap-5 mb-4">
          <Card.Text>{pageWords?.users_table_description}</Card.Text>
          <div className="btn-group w-fit text-end">
            <button className="btn btn-outline-primary w-fit btn-sm whitespace-nowrap" onClick={handleOpenCreateModal}>{pageWords?.create_user}</button>
          </div>
        </div>
        <TableFilter {...tableHook} searchPlaceholder={pageWords?.search_for_user} />
      </Card.Body>
      <Card.Body>
        <Table responsive >
          <thead>
            <tr>
              <th>{pageWords?.no}</th>
              <th>{pageWords?.avatar}</th>
              <th>{pageWords?.full_name}</th>
              <th>{pageWords?.email}</th>
              <th>{pageWords?.verified}</th>
              <th>{pageWords?.type}</th>
              <th>{pageWords?.created_at}</th>
              <th><i className="fal fa-cogs" /></th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td >
                    <span className="flex justify-center">
                      <Image
                        className="avatar avatar-xxs"
                        src={user.avatar ? `${images_paths?.root}/${images_paths?.profile}/${user.avatar}` : avatar}
                        alt=""
                      />
                    </span>
                  </td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td><i className={`fas fa-${user.verified ? "check" : 'xmark'}`} /></td>
                  <td>{user.type}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className="toggle-clean btn-sm">
                        <i className="fas fa-list-timeline" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handelOpenUpdateModal(user)}>{pageWords?.edit}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleDeleteUser(user.id as number)}>{pageWords?.delete}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default UsersTable;
