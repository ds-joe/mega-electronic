import { UseTableResponseData } from "../Hooks/useTable";
import { User } from "../Models/User";

export type UsersTableProps = UseTableResponseData<User>

export type UsersStatusCardsProps = {
  total_users: number,
  total_disabled_users: number
  total_active_users: number
}

export type UsersProps = {
  users_table: UsersTableProps,
  users_status_cards: UsersStatusCardsProps
}
