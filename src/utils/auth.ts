import { ITokenPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";

// decode the token cookie
export const decodeToken = (token: string | undefined = "") => {
  try {
    return jwtDecode<ITokenPayload>(token);
  } catch (err: unknown) {
    console.log((err as Error).message);
    return null;
  }
};