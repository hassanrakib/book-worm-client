import { baseApi } from "@/redux/baseApi";
import { IShelf, TShelfType } from "@/types/shelf";
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
    updateShelfById: build.mutation<
      IResponse<IShelf>,
      { shelfId: string; shelf?: TShelfType; pagesRead?: number }
    >({
      query: ({ shelfId, ...payload }) => ({
        url: `/shelves/${shelfId}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useAddBookToShelfMutation, useUpdateShelfByIdMutation } = shelfApi;
