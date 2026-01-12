import { envConfig } from "@/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // get the token from redux store
      const token = (getState() as RootState).auth.token;

      // if token found attach token in the headers
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});
