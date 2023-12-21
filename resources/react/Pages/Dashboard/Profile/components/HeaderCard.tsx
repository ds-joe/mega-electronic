// Dependencies
import { FCComponent } from "@/types/App";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Components
import { Card, Image } from "react-bootstrap";

// Assets
import avatar from "~/images/auth/userAvatar.svg";

// Types
import { ProfileHeaderCardProps } from "@/types/Pages/Profile";

const HeaderCard: FCComponent<ProfileHeaderCardProps> = ({ pageWords, data }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const images_paths = useSelector((state: RootState) => state.paths.images_paths);
  const userAvatar = user?.avatar ? `${images_paths?.root}/${images_paths?.profile}/${user.avatar}` : avatar;

  return (
    <Card>
      <Card.Body>
        <Card.Body className="flex flex-col lg:flex-row items-center gap-10">
          <Image className="avatar avatar-2xl" src={userAvatar} alt="avatar" />
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-2xl dark:text-white">
              {data.full_name}
            </h2>
            <Card.Text>
              {data.email}
            </Card.Text>
            <p className={`flex items-center gap-1 py-1 px-3  bg-${data.verified ? 'primary' : "danger"} rounded-full w-fit text-xs uppercase font-semibold text-white mt-2`}>
              <i className={`fas fa-${data.verified ? "check-circle" : "xmark-circle"}`}></i>
              {data.verified ? pageWords?.verified : pageWords?.unverified}
            </p>
          </div>
        </Card.Body>
      </Card.Body>
    </Card>
  )
}

export default HeaderCard;
