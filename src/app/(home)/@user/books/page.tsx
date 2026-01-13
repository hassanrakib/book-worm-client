import BookCard from "@/components/user-ui/books/book-card";
import BookFilters from "@/components/user-ui/books/book-filters";
import { getBooks } from "@/services/book";
import { Box, VStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";

const BrowseBooksPage = async () => {
  const books = await getBooks();
  const bookList = books?.data || [];

  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="6" py="8" px="4">
      {/* 1. Header */}
      <Box>
        <Heading size="xl" mb="1">
          Browse Books
        </Heading>
        <Text color="fg.muted" fontSize="sm">
          Find your next favorite read.
        </Text>
      </Box>

      {/* 2. Compact Filters */}
      <BookFilters />

      {/* 3. Book List/Grid */}
      <VStack align="stretch" gap="4">
        <Text
          fontWeight="bold"
          fontSize="sm"
          color="fg.muted"
          textTransform="uppercase"
        >
          {bookList.length} Books Found
        </Text>

        {/* Responsive Columns: 
           1 column on tiny phones (base), 
           2 columns from small tablets/large phones up (sm) 
        */}
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
          {bookList.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </SimpleGrid>

        {bookList.length === 0 && (
          <Box textAlign="center" py="10">
            <Text color="fg.muted">No books match your criteria.</Text>
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default BrowseBooksPage;
