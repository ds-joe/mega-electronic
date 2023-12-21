// Dependencies
import { FC, useEffect } from "react";

// Components
import { Dropdown, Image } from "react-bootstrap";
import { Link } from "@inertiajs/react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Assets
import avatar from "~/images/auth/userAvatar.svg";

const UserDropdown: FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const images_paths = useSelector((state: RootState) => state.paths.images_paths);
  const words = useSelector((state: RootState) => state.layout.layoutsWords.dashboard);
  const userAvatar = user?.avatar ? `${images_paths?.root}/${images_paths?.profile}/${user.avatar}` : avatar;

  return (
    <Dropdown className={'pf-navbar-user-dropdown'}>
      <Dropdown.Toggle className="pf-navbar-user-dropdown-toggle toggle-clean" as={'span'}>
        <img className="avatar avatar-xxs" src={userAvatar} alt="something" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>
          <article className={"pf-navbar-dropdown-user-information"}>
            <Image className={'avatar avatar-sm'} src={userAvatar} alt={"something"} />
            <h3 className={'pf-navbar-dropdown-username'}>{user?.full_name}</h3>
            <h3 className={'pf-navbar-dropdown-email'}>{user?.email}</h3>
          </article>
        </Dropdown.Header>
        <Link className={"dropdown-item"} href={route('profile.show')} as="button">
          <i className="far fa-user icon" />
          {words?.profile}
        </Link>
        <Dropdown.Item>
          <i className="far fa-cog icon" />
          {words?.settings}
        </Dropdown.Item>
        <Link onSuccess={() => location.reload()} className={"dropdown-item"} href={route('auth.logout')} method={'post'} as="button">
          <i className="far fa-door-open icon" />
          {words?.logout}
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UserDropdown;
