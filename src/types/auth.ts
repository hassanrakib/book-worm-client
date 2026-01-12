import { TUserRole } from "./user";

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ITokenPayload {
  userId: string;
  role: TUserRole;
}
