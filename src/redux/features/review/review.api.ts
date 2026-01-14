import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { IReview } from "@/types/review";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addReview: build.mutation<
      IResponse<IReview>,
      Pick<IReview, "rating" | "comment"> & { book: string }
    >({
      query: (payload) => ({
        url: "/reviews",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useAddReviewMutation } = reviewApi;
