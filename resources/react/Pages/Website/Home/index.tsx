// Dependencies
import { FC } from "react";
import Head from "@/Components/Global/Head";

const Home: FC = () => {
  return (
    <main>
      <Head title="Home" />
      <div className="home-page ">
        <span className="bg-primary-700"> Website home page</span>
      </div>
    </main>
  )
}

export default Home;
