import { User } from "../Models/User";

export type UsersTableProps = {
  users: Array<User>
}

export type UsersStatesCardsProps = {
  total_users: number,
  total_disabled_users: number
  total_active_users: number
}

export type UsersProps = UsersStatesCardsProps & {
  users: Array<User>
}
