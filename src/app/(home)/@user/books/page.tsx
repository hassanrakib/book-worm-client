import BookCard from "@/components/user-ui/books/book-card";
import BookFilters from "@/components/user-ui/books/book-filters";
import { getBooks } from "@/services/book";
import { Box, VStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BrowseBooksPage = async ({ searchParams }: PageProps) => {
  // Await searchParams to get the current URL filters
  const filters = await searchParams;

  // getBooks should send these filters to your API
  // which uses your QueryBuilder backend
  const books = await getBooks(filters);
  const bookList = books?.data || [];

  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
      <Box>
        <Heading size="xl" mb="1">
          Browse Books
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          Find your next favorite read.
        </Text>
      </Box>

      {/* This component updates the URL searchParams */}
      <BookFilters />

      <VStack align="stretch" gap="4">
        <Text
          fontWeight="bold"
          fontSize="sm"
          color="fg.muted"
          textTransform="uppercase"
        >
          {bookList.length > 0 ? bookList.length : "No"} Books Found
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
          {bookList.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </SimpleGrid>

        {bookList.length === 0 && (
          <Box
            textAlign="center"
            py="10"
            borderWidth="1px"
            borderStyle="dashed"
            rounded="xl"
          >
            <Text color="fg.muted">
              No books found matching your current filters.
            </Text>
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default BrowseBooksPage;
