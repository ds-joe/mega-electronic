// Dependencies
import { FCComponent } from "@/types/App";

// Components
import StateIconCard from "@/Components/Cards/StateIconCard";

// Types
import { UsersStatesCardsProps } from "@/types/Pages/Users";

const StatesCards: FCComponent<UsersStatesCardsProps> = ({ pageWords, total_active_users, total_disabled_users, total_users }) => {
  return (
    <>
      <StateIconCard value={total_users} description={pageWords?.users} icon={"fa-users"} time={pageWords?.total} />
      <StateIconCard value={total_active_users} description={pageWords?.active_users} icon={"fa-user-check"} time={pageWords?.total} />
      <StateIconCard value={total_disabled_users} description={pageWords?.disabled_users} icon={"fa-user-xmark"} time={pageWords?.total} />
    </>
  )
}

export default StatesCards;
