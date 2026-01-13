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
    updateUserRoleById: build.mutation<
      IResponse<IUser>,
      Pick<IUser, "userId" | "role">
    >({
      query: ({ userId, ...update }) => ({
        url: `/users/${userId}/role`,
        method: "PATCH",
        body: update,
      }),
    }),
  }),
});

export const { useGetMeQuery, useUpdateUserRoleByIdMutation } = userApi;
