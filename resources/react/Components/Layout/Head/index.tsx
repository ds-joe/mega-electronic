// Components
import { Head as MainHead } from "@inertiajs/react";

// Props
import { HeadProps } from "@/types/Components/Layout/Head";

// Assets
import favicon from "~/images/logo/logo-fav.png";

const Head: RC<HeadProps> = ({ children, title }) => {
  return (
    <MainHead title={title}>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      {children}
    </MainHead>
  )
}

export default Head;
