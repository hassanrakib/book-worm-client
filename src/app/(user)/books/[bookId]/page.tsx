import { getBookById } from "@/services/book";
import BookDetailsView from "@/components/user-ui/books/book/book-details-view";
import { notFound } from "next/navigation";
import { VStack } from "@chakra-ui/react";
import ReviewForm from "@/components/user-ui/books/book/review-form";
import ReviewList from "@/components/user-ui/books/book/review-list";

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

  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
      <BookDetailsView book={book} />
      <ReviewForm bookId={book._id} />
      <ReviewList bookId={book._id} />
    </VStack>
  );
}
