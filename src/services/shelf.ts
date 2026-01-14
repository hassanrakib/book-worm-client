import { fetchFromApi } from "@/lib/fetch-from-api";
import { IShelf } from "@/types/shelf";

export const getBooksOfShelvesByUser = async () => {
  return fetchFromApi<{
    want_to_read: IShelf[];
    currently_reading: IShelf[];
    read: IShelf[];
  }>("/shelves", {
    cache: "no-store",
  });
};
