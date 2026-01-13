import { ICategory } from "./category";

export interface IBook {
  title: string;
  author: string;
  category: ICategory;
  description: string;
  coverImage: string;
  totalPages: number;
  avgRating: number;
  reviewCount: number;
  shelfCount: number;
}
