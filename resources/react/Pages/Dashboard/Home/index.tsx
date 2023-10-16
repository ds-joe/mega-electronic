// Dependencies
import { FC } from "react";

// Layout
import DashboardLayout from "@/Layout/Dashboard";

const Home: FC = () => {
  return (
    <DashboardLayout pageTitle="Home">
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200 text-6xl font-bold">
        dashboard home page
      </div>
    </DashboardLayout>
  )
}

export default Home;
