// Dependencies
import { FC, useEffect } from "react";

// React Redux
import { useDispatch } from "react-redux";
import { setLayoutsWords, setSettings, setUrl } from "./redux/slicers/layout";
import { setUser } from "./redux/slicers/auth";
import { setImagesPaths } from "./redux/slicers/paths";

// Assets
import "~/libs/fontawesome/css/all.min.css";
import "@/styles/bootstrap.scss";
import "react-toastify/dist/ReactToastify.css";
import '@/styles/main.scss';


// Types
import { AppProps } from "./types/App";

const App: FC<AppProps> = ({ children, props }) => {
  const dispatch = useDispatch();
  console.log(props)

  useEffect(() => {
    dispatch(setLayoutsWords(props.layoutsWords));
    dispatch(setUrl(props.url));
    dispatch(setUser(props.auth.user));
    dispatch(setSettings(props.settings));
    dispatch(setImagesPaths(props.paths.images_paths));
  }, [props]);


  return (
    <>
      {children}
    </>
  );
}

export default App;
