import { baseApi } from "@/redux/baseApi";
import { ICategory } from "@/types/category";
import { IResponse } from "@/types/global";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<
      IResponse<ICategory>,
      Pick<ICategory, "name">
    >({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
    }),
    updateCategoryById: build.mutation<IResponse<ICategory>, ICategory>({
      query: ({ _id, ...update }) => ({
        url: `/categories/${_id}`,
        method: "PATCH",
        body: update,
      }),
    }),
    getCategories: build.query<IResponse<ICategory[]>, undefined>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryByIdMutation,
  useGetCategoriesQuery,
} = categoryApi;
