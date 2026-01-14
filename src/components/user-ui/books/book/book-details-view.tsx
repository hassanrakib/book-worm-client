"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Badge,
  RatingGroup,
  Separator,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  LuBookOpen,
  LuLayoutDashboard,
} from "react-icons/lu";
import { IBook } from "@/types/book";
import AddToShelf from "./add-to-shelf";

interface BookDetailsViewProps {
  book: IBook;
}

const BookDetailsView = ({ book }: BookDetailsViewProps) => {
  return (
    <VStack alignItems="stretch" maxW="xl" mx="auto" gap="8" py="8" px="4">
      {/* 1. Hero Section */}
      <VStack gap="6" align="center" textAlign="center">
        <Box
          position="relative"
          shadow="2xl"
          borderRadius="xl"
          overflow="hidden"
          width="200px" // Slightly smaller for better xl constraint fit
          aspectRatio={3 / 4}
          bg="gray.100"
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            width="full"
            height="full"
            objectFit="cover"
          />
        </Box>

        <VStack gap="2">
          <Badge
            colorPalette="yellow"
            variant="solid"
            px="3"
            borderRadius="full"
          >
            {book.category?.name}
          </Badge>
          <Heading size="xl" fontWeight="bold" letterSpacing="tight">
            {book.title}
          </Heading>
          <Text fontSize="md" color="fg.muted">
            by{" "}
            <Text as="span" color="fg.default" fontWeight="semibold">
              {book.author}
            </Text>
          </Text>
        </VStack>

        <HStack width="full" gap="3">
          <AddToShelf bookId={book._id} />
        </HStack>
      </VStack>

      {/* 2. Key Stats Bar */}
      <HStack
        justify="space-between"
        p="4"
        bg="bg.subtle"
        borderRadius="2xl"
        borderWidth="1px"
      >
        <VStack gap="0" flex="1">
          <Text fontSize="xs" color="fg.muted" fontWeight="bold">
            RATING
          </Text>
          <HStack gap="1">
            <Text fontWeight="bold" fontSize="sm">
              {book.avgRating}
            </Text>
            <RatingGroup.Root
              readOnly
              count={5}
              defaultValue={Math.round(book.avgRating)}
              size="xs"
              colorPalette="yellow"
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
          </HStack>
        </VStack>

        <Separator orientation="vertical" height="24px" />

        <VStack gap="0" flex="1">
          <Text fontSize="xs" color="fg.muted" fontWeight="bold">
            REVIEWS
          </Text>
          <Text fontWeight="bold" fontSize="sm">
            {book.reviewCount}
          </Text>
        </VStack>

        <Separator orientation="vertical" height="24px" />

        <VStack gap="0" flex="1">
          <Text fontSize="xs" color="fg.muted" fontWeight="bold">
            SHELVES
          </Text>
          <Text fontWeight="bold" fontSize="sm">
            {book.shelfCount}
          </Text>
        </VStack>
      </HStack>

      {/* 3. Description */}
      <Box>
        <Heading
          size="sm"
          mb="3"
          textTransform="uppercase"
          letterSpacing="widest"
          color="fg.muted"
        >
          About this book
        </Heading>
        <Text color="fg.default" lineHeight="relaxed" fontSize="md">
          {book.description}
        </Text>
      </Box>

      {/* 4. Technical Details */}
      <Box>
        <Heading
          size="sm"
          mb="4"
          textTransform="uppercase"
          letterSpacing="widest"
          color="fg.muted"
        >
          Details
        </Heading>
        <SimpleGrid columns={2} gap="3">
          <HStack gap="3" p="3" borderWidth="1px" borderRadius="xl">
            <Box bg="blue.50" p="2" rounded="lg">
              <LuBookOpen size="16" color="var(--chakra-colors-blue-600)" />
            </Box>
            <Box>
              <Text fontSize="2xs" color="fg.muted" fontWeight="bold">
                PAGES
              </Text>
              <Text fontWeight="semibold" fontSize="xs">
                {book.totalPages}
              </Text>
            </Box>
          </HStack>

          <HStack gap="3" p="3" borderWidth="1px" borderRadius="xl">
            <Box bg="purple.50" p="2" rounded="lg">
              <LuLayoutDashboard
                size="16"
                color="var(--chakra-colors-purple-600)"
              />
            </Box>
            <Box>
              <Text fontSize="2xs" color="fg.muted" fontWeight="bold">
                FORMAT
              </Text>
              <Text fontWeight="semibold" fontSize="xs">
                Digital / Print
              </Text>
            </Box>
          </HStack>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default BookDetailsView;
