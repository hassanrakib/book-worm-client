import { fetchFromApi } from "@/lib/fetch-from-api";
import { IBook } from "@/types/book";
import { QueryParams } from "@/types/global";

export const getBooks = async (queryParams?: QueryParams) => {
  return fetchFromApi<IBook[]>("/books", {
    queryParams,
    cache: "no-store",
  });
};
