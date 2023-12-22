// Assets
import "~/libs/fontawesome/css/all.min.css";
import "@/styles/bootstrap.scss";
import "react-toastify/dist/ReactToastify.css";
import '@/styles/main.scss';

// Types
import { AppProps } from "./types/App";

const App: RC<AppProps> = ({ children }) => {

  return (
    <>
      {children}
    </>
  );
}

export default App;
