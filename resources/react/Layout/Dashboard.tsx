// Dependencies
import { FC } from "react";

// Components
import Head from "@/Components/Global/Head";

// Types
import { LayoutProps } from "@/types/Layouts/Layout";

const DashboardLayout: FC<LayoutProps> = ({ pageTitle, children }) => {
  return (
    <main>
      <Head title={`Dashboard - ${pageTitle}`}></Head>
      {children}
    </main>
  )
}

export default DashboardLayout;
