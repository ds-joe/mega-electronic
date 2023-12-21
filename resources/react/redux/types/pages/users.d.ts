import { User } from "@/types/Models/User"

export type UsersSlicerState = {
  createUserModalDisplay: boolean,
  updateUserModalDisplay: boolean,
  updatingUser: User | null
}
