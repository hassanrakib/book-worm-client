import { baseApi } from "@/redux/baseApi";
import { ICategory } from "@/types/category";
import { IResponse } from "@/types/global";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<IResponse<ICategory>, ICategory>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
    }),
  }),
});

export const { useCreateCategoryMutation } = categoryApi;
