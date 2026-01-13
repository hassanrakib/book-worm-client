"use client";

import {
  Box,
  Text,
  Badge,
  RatingGroup,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import StyledButton from "@/components/shared/styled-button";
import { IBook } from "@/types/book";

const BookCard = ({ book }: { book: IBook }) => {
  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      // Changed from 2/3 to 3/4 to make the card height shorter
      aspectRatio={3 / 4}
      bg="gray.200"
      role="group"
      shadow="md"
      width="full"
    >
      {/* 1. Background Image */}
      <Image
        src={book.coverImage}
        alt={book.title}
        width="full"
        height="full"
        objectFit="cover"
        transition="transform 0.5s ease-in-out"
        _groupHover={{ transform: "scale(1.1)" }}
      />

      {/* 2. Top Genre Badge */}
      <Badge
        position="absolute"
        top="3"
        left="3"
        variant="solid"
        bg="yellow.300"
        color="black"
        size="xs"
        borderRadius="full"
        px="2"
        fontWeight="bold"
        boxShadow="sm"
      >
        {book.category.name}
      </Badge>

      {/* 3. Gradient Overlay & Info Content */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p="4"
        bgGradient="to-t"
        // Increased gradient height to ensure text readability on shorter height
        gradientFrom="blackAlpha.950"
        gradientTo="transparent"
        pt="16"
      >
        <VStack align="start" gap="0.5">
          <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>
            {book.title}
          </Text>

          <Text color="whiteAlpha.700" fontSize="xs" mb="0.5" lineClamp={1}>
            {book.author}
          </Text>

          <HStack gap="1.5">
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
            <Text color="whiteAlpha.900" fontSize="xs" fontWeight="bold">
              {book.avgRating} ({book.reviewCount})
            </Text>
          </HStack>

          <StyledButton
            width="full"
            size="xs"
            variant="solid"
            bg="white"
            color="black"
            _hover={{ bg: "gray.200" }}
            mt="2" // Slightly reduced margin for compact height
          >
            View Details
          </StyledButton>
        </VStack>
      </Box>
    </Box>
  );
};

export default BookCard;
