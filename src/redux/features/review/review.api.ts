import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { IReview, TReviewStatus } from "@/types/review";

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
    deleteReviewById: build.mutation<IResponse<IReview>, { reviewId: string }>({
      query: ({ reviewId }) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
    updateReviewStatusById: build.mutation<
      IResponse<IReview>,
      { reviewId: string; status: TReviewStatus }
    >({
      query: ({ reviewId, ...payload }) => ({
        url: `/reviews/${reviewId}/status`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useAddReviewMutation, useUpdateReviewStatusByIdMutation, useDeleteReviewByIdMutation } = reviewApi;
