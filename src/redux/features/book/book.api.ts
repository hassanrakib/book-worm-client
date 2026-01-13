import { baseApi } from "@/redux/baseApi";
import { IBook } from "@/types/book";
import { IResponse } from "@/types/global";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBook: build.mutation<IResponse<IBook>, FormData>({
      query: (formData) => ({
        url: "/books",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateBookMutation } = bookApi;
