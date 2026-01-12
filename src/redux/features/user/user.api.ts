import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { IUser } from "@/types/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<IResponse<Omit<IUser, "password">>, undefined>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMeQuery } = userApi;
