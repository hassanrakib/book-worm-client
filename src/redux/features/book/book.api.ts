import { baseApi } from "@/redux/baseApi";
import { IBook } from "@/types/book";
import { IResponse, QueryParams } from "@/types/global";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBook: build.mutation<IResponse<IBook>, FormData>({
      query: (formData) => ({
        url: "/books",
        method: "POST",
        body: formData,
      }),
    }),
    getBooks: build.query<IResponse<IBook[]>, QueryParams>({
      query: (params) => ({
        url: "/books",
        method: "GET",
        params,
      }),
    }),
    updateBookById: build.mutation<
      IResponse<IBook>,
      { bookId: string; formData: FormData }
    >({
      query: ({ bookId, formData }) => ({
        url: `/books/${bookId}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteBookById: build.mutation<
      IResponse<IBook>,
      { bookId: string }
    >({
      query: ({ bookId }) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useUpdateBookByIdMutation,
  useDeleteBookByIdMutation,
} = bookApi;
