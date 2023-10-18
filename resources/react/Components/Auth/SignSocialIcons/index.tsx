// Dependencies
import { FC } from "react";

// Types
import { SignSocialIconsProps } from "@/types/Components/Auth/SignSocialIcons";

const SignSocialIcons: FC<SignSocialIconsProps> = ({ children, className }) => {
  return (
    <div className={`sign-social-icons ${className}`}>
      <i className="fab fa-facebook social-icon" />
      <i className="fab fa-google social-icon" />
      <i className="fab fa-apple social-icon" />
      {children}
    </div>
  )
}

export default SignSocialIcons;
