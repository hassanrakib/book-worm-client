import { IBook } from "./book";
import { IUser } from "./user";

export const SHELF_TYPE = {
  WantToRead: "want_to_read",
  CurrentlyReading: "currently_reading",
  Read: "read",
} as const;

export type TShelfType = (typeof SHELF_TYPE)[keyof typeof SHELF_TYPE];

export interface IShelf {
  _id: string;
  user: IUser
  book: IBook;
  shelf: TShelfType;
  pagesRead?: number;
}
