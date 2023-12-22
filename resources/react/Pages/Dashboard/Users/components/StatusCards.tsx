// Components
import StateIconCard from "@/Components/Cards/StateIconCard";

// Hooks
import { usePage } from "@inertiajs/react";

// Types
import { UsersProps } from "@/types/Pages/Users";

const StatusCards: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<UsersProps>;
  const { total_active_users, total_disabled_users, total_users } = pageData.users_status_cards;

  return (
    <>
      <StateIconCard value={total_users} description={pageWords?.users} icon={"fa-users"} time={pageWords?.total} />
      <StateIconCard value={total_active_users} description={pageWords?.active_users} icon={"fa-user-check"} time={pageWords?.total} />
      <StateIconCard value={total_disabled_users} description={pageWords?.disabled_users} icon={"fa-user-xmark"} time={pageWords?.total} />
    </>
  )
}

export default StatusCards;
