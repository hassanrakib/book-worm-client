import { fetchFromApi } from "@/lib/fetch-from-api";
import { QueryParams } from "@/types/global";
import { IUser } from "@/types/user";

export const getUsers = async (queryParams?: QueryParams) => {
  return fetchFromApi<IUser[]>("/users", {
    queryParams,
    cache: "no-store",
  });
};

export const getMe = async () => {
  return fetchFromApi<Omit<IUser, "password">>("/users/me", {
    cache: "no-store",
  });
};
