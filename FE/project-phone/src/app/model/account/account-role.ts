import {Role} from "./role";
import {Account} from "./account";

export interface AccountRole {
  id?: number;
  role?: Role;
  account?: Account
}
