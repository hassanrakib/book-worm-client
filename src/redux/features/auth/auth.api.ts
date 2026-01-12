import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { IUser } from "@/types/user";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<
      IResponse<Omit<IUser, "password">>,
      Pick<IUser, "name" | "email" | "password">
    >({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
