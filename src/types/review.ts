import { IBook } from "./book";
import { IUser } from "./user";

export const REVIEW_STATUS = {
  Pending: "pending",
  Approved: "approved",
} as const;

export type TReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

export interface IReview {
  _id: string;
  user: IUser;
  book: IBook;
  rating: number; // 0–5
  comment: string;
  status: "pending" | "approved";
}
