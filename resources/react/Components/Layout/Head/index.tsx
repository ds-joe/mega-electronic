// Dependencies
import { FC } from "react";

// Components
import { Head as MainHead } from "@inertiajs/react";

// Props
import { HeadProps } from "@/types/Components/Layout/Head";

// Assets
import favicon from "~/images/logo/logo-fav.png";

const Head: FC<HeadProps> = ({ children, title }) => {
  return (
    <MainHead title={title}>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      {children}
    </MainHead>
  )
}

export default Head;
