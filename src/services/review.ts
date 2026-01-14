import { fetchFromApi } from "@/lib/fetch-from-api";
import { IReview } from "@/types/review";

export const getReviews = async () => {
  return fetchFromApi<IReview[]>("/reviews", {
    cache: "no-store",
  });
};
