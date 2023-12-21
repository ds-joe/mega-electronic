import { User } from "./Models/User";

export interface AuthProps {
  user: User | null;
  permissions: Array<string>;
}
