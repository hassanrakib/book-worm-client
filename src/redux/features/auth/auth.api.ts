import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { IUser } from "@/types/user";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<
      IResponse<Omit<IUser, "password">>,
      FormData
    >({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApi;
