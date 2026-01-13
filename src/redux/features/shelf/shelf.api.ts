import { baseApi } from "@/redux/baseApi";
import { IShelf } from "@/types/shelf";
import { IResponse, QueryParams } from "@/types/global";

const shelfApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBookToShelf: build.mutation<IResponse<IShelf>, { book: string }>({
      query: (payload) => ({
        url: "/shelves",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddBookToShelfMutation } = shelfApi;
