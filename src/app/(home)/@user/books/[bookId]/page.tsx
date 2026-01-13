import { getBookById } from "@/services/book";
import BookDetailsView from "@/components/user-ui/books/book-details-view";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ bookId: string }>;
}

export default async function BookDetailsPage({ params }: PageProps) {
  const { bookId } = await params;

  // Fetch book data from your service
  const response = await getBookById(bookId);
  const book = response?.data;

  if (!book) {
    notFound(); // Triggers Next.js 404 page if book doesn't exist
  }

  return <BookDetailsView book={book} />;
}
