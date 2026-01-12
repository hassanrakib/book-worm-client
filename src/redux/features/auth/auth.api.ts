import { baseApi } from "@/redux/baseApi";
import { ILoginCredentials } from "@/types/auth";
import { IResponse } from "@/types/global";
import { IUser } from "@/types/user";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<IResponse<Omit<IUser, "password">>, FormData>({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
    }),
    signIn: build.mutation<
      IResponse<{ token: string; user: Omit<IUser, "password"> }>,
      ILoginCredentials
    >({
      query: (loginCredentials) => ({
        url: "auth/login",
        method: "POST",
        body: loginCredentials,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useSignInMutation } = authApi;
