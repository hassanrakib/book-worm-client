import { fetchFromApi } from "@/lib/fetch-from-api";
import { QueryParams } from "@/types/global";
import { ICategory } from "@/types/category";

export const getCategories = async (queryParams?: QueryParams) => {
  return fetchFromApi<ICategory[]>("/categories", {
    queryParams,
    cache: "no-store",
    next: {
      tags: ["categories"],
    },
  });
};
