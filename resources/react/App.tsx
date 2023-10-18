// Dependencies
import { FC, useEffect } from "react";

// React Redux
import { useDispatch } from "react-redux";
import { setLayoutsWords } from "./redux/global/slicers/layout";

// Assets
import "~/libs/fontawesome/css/all.min.css";
import "@/styles/bootstrap.scss";
import '@/styles/main.scss';

// Types
import { AppProps } from "./types/App";

const App: FC<AppProps> = ({ children, props }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLayoutsWords(props.layoutsWords));
  }, [])

  return children;
}

export default App;
