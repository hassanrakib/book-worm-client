import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import BookCard from "@/components/user-ui/shared/book-card";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { getRecommendedBooksForUser } from "@/services/book";
import StyledButton from "@/components/shared/styled-button";

const RecommendedBooks = async () => {
  const response = await getRecommendedBooksForUser();

  const books = response.data || [];

  return (
    <VStack align="stretch" gap="5" py="6">
      {/* Header Section */}
      <HStack justify="space-between" align="flex-end">
        <Box>
          <Heading size="md" letterSpacing="tight">
            Recommended for You
          </Heading>
          <Text fontSize="xs" color="fg.muted">
            Based on your reading history
          </Text>
        </Box>

        <Link href="/books">
          <StyledButton
            variant="solid"
            size="xs"
            colorPalette="yellow"
            fontWeight="bold"
          >
            See All <LuArrowRight />
          </StyledButton>
        </Link>
      </HStack>

      <SimpleGrid columns={2} gap="4">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </SimpleGrid>

      {/* Empty State */}
      {books.length === 0 && (
        <Box
          textAlign="center"
          py="10"
          borderWidth="1px"
          borderStyle="dashed"
          borderRadius="2xl"
        >
          <Text color="fg.muted" fontSize="sm">
            Check back later for recommendations.
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default RecommendedBooks;
